<script lang="ts">
    import { isEmpty, size } from "lodash";
    import { get } from "svelte/store";
    import * as ButtonCostsStore from "~/store/buttonCosts";
    import * as GameStateStore from "~/store/gameState";
    import * as MilitaryStore from "~/store/military";
    import * as ResourcesStore from "~/store/resources";
    //  import * as ScienceStore from "~/store/science";
    import * as WorkersStore from "~/store/workers";
    import * as LibraryStore from "~/store/library";

    const STORE_TYPES: Record<string, string> = {
        BUTTON_COSTS: "buttonCostsStore",
        GAME_STATE: "gameStateStore",
        MILITARY: "militaryStore",
        RESOURCES: "resourcesStore",
        WORKERS: "workersStore",
        LIBRARY: "libraryStore",
    };
    const storeCategories: Set<string> = new Set([
        STORE_TYPES.BUTTON_COSTS,
        STORE_TYPES.GAME_STATE,
        STORE_TYPES.MILITARY,
        STORE_TYPES.RESOURCES,
        STORE_TYPES.WORKERS,
        STORE_TYPES.LIBRARY,
    ]);
    let displayCredits = false;
    // KEY POINT: Don't forget to add every hashset store into the hashSetStores constant!
    const divider = "divider";
    const hashSetStores = new Set<string>([
        "hiddenButtons",
        "researchedSciences",
        "obtainedResources",
        "completedCollections",
        "unlockedCollections",
    ]);
    let loadError = false;
    let loadSuccess = false;
    let saveText = "";
    let loadText =
        "YnV0dG9uQ29zdHNTdG9yZWRpdmlkZXJlbXBpcmVCdXR0b25Db3N0c2RpdmlkZXJ7ImNyZWF0ZUZhcm0iOlt7InR5cGUiOiJmb29kIiwiY29zdCI6MjN9LHsidHlwZSI6Indvb2QiLCJjb3N0IjoxMn1dLCJidWlsZFN0b3JhZ2UiOlt7InR5cGUiOiJ3b29kIiwiY29zdCI6NTV9XSwiY3JlYXRlVHJlZUZhcm0iOlt7InR5cGUiOiJ3b29kIiwiY29zdCI6NTZ9XSwiYnVpbGRBdHRyYWN0aXZlSG91c2UiOlt7InR5cGUiOiJmb29kIiwiY29zdCI6NzAwfSx7InR5cGUiOiJ3b29kIiwiY29zdCI6NzAwfV0sImJ1aWxkSG91c2UiOlt7InR5cGUiOiJ3b29kIiwiY29zdCI6MTUwfV0sImJ1aWxkTWFuc2lvbiI6W3sidHlwZSI6Indvb2RQbGFuayIsImNvc3QiOjUwfSx7InR5cGUiOiJzdGVlbCIsImNvc3QiOjIwfV0sImJ1aWxkVGF2ZXJuIjpbeyJ0eXBlIjoiZm9vZCIsImNvc3QiOjEwMDB9LHsidHlwZSI6Indvb2RQbGFuayIsImNvc3QiOjEwMH0seyJ0eXBlIjoic3RlZWwiLCJjb3N0IjozMH0seyJ0eXBlIjoiZ29sZCIsImNvc3QiOjEwfV0sImJ1aWxkQXRoZW5hZXVtICI6W3sidHlwZSI6Indvb2QiLCJjb3N0Ijo1NTB9XSwiYnVpbGRXYXJlaG91c2UiOlt7InR5cGUiOiJ3b29kUGxhbmsiLCJjb3N0IjozMH0seyJ0eXBlIjoiaXJvbiIsImNvc3QiOjV9XSwiYnVpbGRHcmFuYXJ5IjpbeyJ0eXBlIjoiZm9vZCIsImNvc3QiOjUwMH0seyJ0eXBlIjoid29vZFBsYW5rIiwiY29zdCI6MjB9LHsidHlwZSI6Imlyb24iLCJjb3N0IjoxMH1dLCJidWlsZFNhd21pbGwiOlt7InR5cGUiOiJ3b29kIiwiY29zdCI6NTAwfSx7InR5cGUiOiJ3b29kUGxhbmsiLCJjb3N0IjoyMH0seyJ0eXBlIjoiaXJvbiIsImNvc3QiOjEwfV0sImJ1aWxkUXVhcnJ5IjpbeyJ0eXBlIjoicmF3T3JlIiwiY29zdCI6NTAwfSx7InR5cGUiOiJ3b29kUGxhbmsiLCJjb3N0IjoyMH0seyJ0eXBlIjoiaXJvbiIsImNvc3QiOjEwfV0sImJ1aWxkVW5pdmVyc2l0eSI6W3sidHlwZSI6Imtub3dsZWRnZSIsImNvc3QiOjUwMH0seyJ0eXBlIjoiZnVycyIsImNvc3QiOjEwMH0seyJ0eXBlIjoid29vZFBsYW5rIiwiY29zdCI6MjB9LHsidHlwZSI6Imlyb24iLCJjb3N0IjoxMH1dLCJidWlsZFdvcmtzaG9wIjpbeyJ0eXBlIjoid29vZCIsImNvc3QiOjMwMDB9LHsidHlwZSI6ImdvbGQiLCJjb3N0IjoxfV0sImJ1aWxkSXJvblNtZWx0ZXIiOlt7InR5cGUiOiJyYXdPcmUiLCJjb3N0Ijo1MDAwfSx7InR5cGUiOiJjb2FsIiwiY29zdCI6NTAwfSx7InR5cGUiOiJ3b29kUGxhbmsiLCJjb3N0IjoxMDB9LHsidHlwZSI6ImdvbGQiLCJjb3N0Ijo1fV0sImJ1aWxkQmxhc3RGdXJuYWNlIjpbeyJ0eXBlIjoicmF3T3JlIiwiY29zdCI6MTAwMDB9LHsidHlwZSI6Indvb2QiLCJjb3N0Ijo1MDAwfSx7InR5cGUiOiJjb2FsIiwiY29zdCI6MTAwMH0seyJ0eXBlIjoid29vZFBsYW5rIiwiY29zdCI6MjAwfSx7InR5cGUiOiJpcm9uIiwiY29zdCI6MTAwfSx7InR5cGUiOiJnb2xkIiwiY29zdCI6MjB9XSwiYnVpbGRNaXRocmlsRnVybmFjZSI6W3sidHlwZSI6ImNvYWwiLCJjb3N0IjoxMDAwMH0seyJ0eXBlIjoid29vZFBsYW5rIiwiY29zdCI6MTAwMH0seyJ0eXBlIjoic3RlZWwiLCJjb3N0Ijo1MDB9LHsidHlwZSI6Im1pdGhyaWwiLCJjb3N0IjoxMDB9LHsidHlwZSI6ImdvbGQiLCJjb3N0IjoxMDB9XSwiYnVpbGRNYWdpY0Z1cm5hY2UiOlt7InR5cGUiOiJrbm93bGVkZ2UiLCJjb3N0IjoyMDAwMH0seyJ0eXBlIjoid29vZFBsYW5rIiwiY29zdCI6MTAwMDB9LHsidHlwZSI6Im1pdGhyaWwgYWxsb3kiLCJjb3N0Ijo1MDB9LHsidHlwZSI6ImFkYW1hbnRpdGUiLCJjb3N0Ijo1MH0seyJ0eXBlIjoiZ29sZCIsImNvc3QiOjUwMH1dfWRpdmlkZXJnYW1lU3RhdGVTdG9yZWRpdmlkZXJjdXJTdG9yeVByb2dyZXNzZGl2aWRlcjE2ZGl2aWRlcmhpZGRlbkJ1dHRvbnNkaXZpZGVyWyJnYXRoZXJGb29kIiwiZ2F0aGVyV29vZCIsImJ1aWxkQXR0cmFjdGl2ZUhvdXNlIiwiYnVpbGRBdGhlbmFldW0gIl1kaXZpZGVyaW5FeHBlZGl0aW9uZGl2aWRlcmZhbHNlZGl2aWRlcnBsYXllckltYWdlZGl2aWRlciIuLi9zcHJpdGVzL3BlYXNhbnQucG5nImRpdmlkZXJwbGF5ZXJOYW1lZGl2aWRlciJQZWFzYW50ImRpdmlkZXJyZXNlYXJjaGVkU2NpZW5jZXNkaXZpZGVyWyJhIiwiYiIsImMiLCJkIiwibWF0aGVtYXRpY3MiLCJkb3VibGVCaXRBeGUiLCJvcmVNaW5pbmciLCJob3JzZUNvbGxhciIsImJsb2NrUHJpbnRpbmciLCJ3b29kZW5QaWNrYXhlIiwiY3JhbmUiLCJpbmR1c3RyeSIsImlyb25TbWVsdGluZyIsImJvd1NhdyIsImhlYXZ5UGxvdyIsImlyb25QaWNrYXhlIiwiaHVudGVycyIsImJhcnJhY2tzIiwibGF3c09mTmF0dXJlIiwiY29uc2NyaXB0aW9uIiwic3RlZWxNYWtpbmciLCJtYWdpYyIsImhlYXZ5SW5mYW50cnkiLCJzbGluZ3Nob3RzIl1kaXZpZGVybWlsaXRhcnlTdG9yZWRpdmlkZXJhdHRhY2tSYW5nZUNlbnRlckNvb3JkaW5hdGVzZGl2aWRlcnt9ZGl2aWRlcmNsZWFyZWRTdGFnZXNkaXZpZGVyeyIxLTEiOmZhbHNlLCIxLTIiOmZhbHNlLCIxLTMiOmZhbHNlLCIxLTQiOmZhbHNlLCIxLTUiOmZhbHNlLCIyLTEiOmZhbHNlLCIyLTIiOmZhbHNlLCIyLTMiOmZhbHNlLCIyLTQiOmZhbHNlLCIyLTUiOmZhbHNlLCIzLTEiOmZhbHNlLCIzLTIiOmZhbHNlLCIzLTMiOmZhbHNlfWRpdmlkZXJpc0dsb2JhbFBvaXNvbk9uZGl2aWRlcmZhbHNlZGl2aWRlcmxpZmVDb3VudGRpdmlkZXIxZGl2aWRlcm1pbGl0YXJ5VW5pdExpc3RkaXZpZGVyeyJzcGVhcm1hbiI6eyJjb3VudCI6MSwidHlwZSI6InNwZWFybWFuIn0sImZvb3RwYWQiOnsiY291bnQiOjAsInR5cGUiOiJmb290cGFkIn0sImhlYXZ5SW5mYW50cnkiOnsiY291bnQiOjAsInR5cGUiOiJoZWF2eUluZmFudHJ5In0sIm1hZ2UiOnsiY291bnQiOjAsInR5cGUiOiJtYWdlIn0sInRodW5kZXJlciI6eyJjb3VudCI6MCwidHlwZSI6InRodW5kZXJlciJ9fWRpdmlkZXJyZW1vdmVkRW5lbXlVbml0Q291bnRkaXZpZGVyMGRpdmlkZXJzZWxlY3RlZE1pbGl0YXJ5VW5pdHNkaXZpZGVyW11kaXZpZGVyc2hvdWxkSGlnaGxpZ2h0TWVsZWVDZWxsc2RpdmlkZXJmYWxzZWRpdmlkZXJzaG91bGRIaWdobGlnaHRSYW5nZWRDZWxsc2RpdmlkZXJmYWxzZWRpdmlkZXJ1bml0SGFzQmVlbkRlcGxveWVkZGl2aWRlcmZhbHNlZGl2aWRlcnVuaXRUb0RlcGxveWRpdmlkZXJ7fWRpdmlkZXJyZXNvdXJjZXNTdG9yZWRpdmlkZXJibGFzdEZ1cm5hY2VzQWN0aXZhdGVkZGl2aWRlcmZhbHNlZGl2aWRlcmluc3VmZmljaWVudEZvb2RkaXZpZGVyZmFsc2VkaXZpZGVyaXJvblNtZWx0ZXJzQWN0aXZhdGVkZGl2aWRlcmZhbHNlZGl2aWRlcm1hZ2ljRnVybmFjZXNBY3RpdmF0ZWRkaXZpZGVyZmFsc2VkaXZpZGVyb2J0YWluZWRSZXNvdXJjZXNkaXZpZGVyWyJmb29kIiwid29vZCIsImZhcm0iLCJ0cmVlRmFybSIsInN0b3JhZ2UiLCJhdGhlbmFldW0iXWRpdmlkZXJyZXNvdXJjZXNkaXZpZGVyeyJmb29kIjp7InZhbHVlIjoxNTkxMjguNSwibGltaXQiOjIwMDEwMCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjp0cnVlfSwid29vZCI6eyJ2YWx1ZSI6MTUyMzA4LCJsaW1pdCI6MjAwMTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJrbm93bGVkZ2UiOnsidmFsdWUiOjkwMzAwLCJsaW1pdCI6MjAwMTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJyYXdPcmUiOnsidmFsdWUiOjE1OTgwMCwibGltaXQiOjIwMDEwMCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjp0cnVlfSwiY29hbCI6eyJ2YWx1ZSI6MTYwMTAwLCJsaW1pdCI6MjAwMTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJ3b29kUGxhbmsiOnsidmFsdWUiOjE2MDA4MCwibGltaXQiOjIwMDEwMCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjp0cnVlfSwiaXJvbiI6eyJ2YWx1ZSI6MTU5NjQwLCJsaW1pdCI6MjAwMTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJzdGVlbCI6eyJ2YWx1ZSI6MTYwMDkwLCJsaW1pdCI6MjAwMTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJtaXRocmlsIjp7InZhbHVlIjoxNjAxMDAsImxpbWl0IjoyMDAxMDAsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6dHJ1ZX0sIm1pdGhyaWwgYWxsb3kiOnsidmFsdWUiOjE2MDEwMCwibGltaXQiOjIwMDEwMCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjp0cnVlfSwiYWRhbWFudGl0ZSI6eyJ2YWx1ZSI6MTYwMTAwLCJsaW1pdCI6MjAwMTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJhZGFtYW50aXRlIGFsbG95Ijp7InZhbHVlIjoxNjAxMDAsImxpbWl0IjoyMDAxMDAsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6dHJ1ZX0sImdvbGQiOnsidmFsdWUiOjE2MDAwMCwibGltaXQiOjIwMDEwMCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjp0cnVlfSwiZnVycyI6eyJ2YWx1ZSI6MTYwMTAwLCJsaW1pdCI6MjAwMTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJmYXJtIjp7InZhbHVlIjoxLCJnZW5lcmF0aW9uVmFsdWUiOjEsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sInRyZWVGYXJtIjp7InZhbHVlIjoxLCJnZW5lcmF0aW9uVmFsdWUiOjIsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sInN0b3JhZ2UiOnsidmFsdWUiOjEsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sIndhcmVob3VzZSI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwiYXR0cmFjdGl2ZUhvdXNlIjp7InZhbHVlIjowLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJob21lIjp7InZhbHVlIjoxLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJtYW5zaW9uIjp7InZhbHVlIjowLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJ0YXZlcm4iOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sImF0aGVuYWV1bSI6eyJ2YWx1ZSI6MSwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwiZ3JhbmFyeSI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwic2F3bWlsbCI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwicXVhcnJ5Ijp7InZhbHVlIjowLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJ1bml2ZXJzaXR5Ijp7InZhbHVlIjowLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJ3b3Jrc2hvcCI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwiaXJvblNtZWx0ZXIiOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sImJsYXN0RnVybmFjZSI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwibWl0aHJpbEZ1cm5hY2UiOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sIm1hZ2ljRnVybmFjZSI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwic2luYXRyYVNoYXR0ZXJlZEFybW9yIjp7InZhbHVlIjowLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJoYWxiZXJkT2ZBZHVuIjp7InZhbHVlIjowLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJsdXRhcmV6V2FyaGFtbWVyIjp7InZhbHVlIjowLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJhZWR1c1RvbWVPZktub3dsZWRnZSI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwiZ2VtT2ZFdGhlcmVhbGl0eSI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfX1kaXZpZGVycmVzb3VyY2VzRnJvbUV4cGVkaXRpb25zZGl2aWRlcnsiZm9vZCI6MCwid29vZCI6MCwia25vd2xlZGdlIjowLCJyYXdPcmUiOjAsImNvYWwiOjAsIndvb2RQbGFuayI6MCwiaXJvbiI6MCwiZ29sZCI6MCwiZnVycyI6MCwic3RlZWwiOjAsIm1pdGhyaWwiOjAsIm1pdGhyaWwgYWxsb3kiOjAsImFkYW1hbnRpdGUiOjAsImFkYW1hbnRpdGUgYWxsb3kiOjAsImZhcm0iOjAsInRyZWVGYXJtIjowLCJob21lIjowLCJtYW5zaW9uIjowLCJ0YXZlcm4iOjAsImF0aGVuYWV1bSI6MCwic3RvcmFnZSI6MCwid2FyZWhvdXNlIjowLCJncmFuYXJ5IjowLCJzYXdtaWxsIjowLCJxdWFycnkiOjAsInVuaXZlcnNpdHkiOjAsIndvcmtzaG9wIjowLCJpcm9uU21lbHRlciI6MCwiYmxhc3RGdXJuYWNlIjowLCJtaXRocmlsRnVybmFjZSI6MCwibWFnaWNGdXJuYWNlIjowLCJhdHRyYWN0aXZlSG91c2UiOjAsInNpbmF0cmFTaGF0dGVyZWRBcm1vciI6MCwiaGFsYmVyZE9mQWR1biI6MCwibHV0YXJleldhcmhhbW1lciI6MCwiYWVkdXNUb21lT2ZLbm93bGVkZ2UiOjAsImdlbU9mRXRoZXJlYWxpdHkiOjB9ZGl2aWRlcm1pdGhyaWxGdXJuYWNlc0FjdGl2YXRlZGRpdmlkZXJmYWxzZWRpdmlkZXJ3b3Jrc2hvcHNBY3RpdmF0ZWRkaXZpZGVyZmFsc2VkaXZpZGVyd29ya2Vyc1N0b3JlZGl2aWRlcndvcmtlcnNkaXZpZGVyeyJ1bmFzc2lnbmVkIjp7InZhbHVlIjoxLCJnZW5lcmF0aW9uVmFsdWUiOjB9LCJmYXJtZXJzIjp7InZhbHVlIjowLCJnZW5lcmF0aW9uVmFsdWUiOjEwfSwid29vZGN1dHRlcnMiOnsidmFsdWUiOjAsImdlbmVyYXRpb25WYWx1ZSI6MTB9LCJzY2hvbGFycyI6eyJ2YWx1ZSI6MCwiZ2VuZXJhdGlvblZhbHVlIjoxMH0sImh1bnRlcnMiOnsidmFsdWUiOjAsImdlbmVyYXRpb25WYWx1ZSI6NX0sIm1pbmVycyI6eyJ2YWx1ZSI6MCwiZ2VuZXJhdGlvblZhbHVlIjoxMH0sImVsaXRlIG1pbmVycyI6eyJ2YWx1ZSI6MCwiZ2VuZXJhdGlvblZhbHVlIjowLjF9LCJtYWdpYyBtaW5lcnMiOnsidmFsdWUiOjAsImdlbmVyYXRpb25WYWx1ZSI6MC4wNX19ZGl2aWRlcnRvdGFsV29ya2Vyc2RpdmlkZXIxZGl2aWRlcmxpYnJhcnlTdG9yZWRpdmlkZXJjb21wbGV0ZWRDb2xsZWN0aW9uc2RpdmlkZXJbIm1lcmNlbmFyeSJdZGl2aWRlcnVubG9ja2VkTGlicmFyeWRpdmlkZXJmYWxzZWRpdmlkZXJ1bmxvY2tlZENvbGxlY3Rpb25zZGl2aWRlclsiaHVmc0pvdXJuYWwwIl0=";
    let copiedSave = false;
    const generateSave = () => {
        saveText += STORE_TYPES.BUTTON_COSTS + divider;
        saveText += generateStoreSave(ButtonCostsStore);
        saveText += STORE_TYPES.GAME_STATE + divider;
        saveText += generateStoreSave(GameStateStore);
        saveText += STORE_TYPES.MILITARY + divider;
        saveText += generateStoreSave(MilitaryStore);
        saveText += STORE_TYPES.RESOURCES + divider;
        saveText += generateStoreSave(ResourcesStore);
        saveText += STORE_TYPES.WORKERS + divider;
        saveText += generateStoreSave(WorkersStore);
        saveText += STORE_TYPES.LIBRARY + divider;
        saveText += generateStoreSave(LibraryStore);
        // remove the last divider
        saveText = saveText.substring(0, saveText.length - divider.length);
        saveText = btoa(saveText);
        copiedSave = false;
    };
    const generateStoreSave = (stores: any): string => {
        let save = "";
        for (const [key, value] of Object.entries(stores)) {
            save += stringifyStore(key, value);
        }
        return save;
    };
    const stringifyStore = (key: string, value: any): string => {
        let storeValue = get(value);
        // can't json stringify a set directly so we need to parse it into an array
        if (hashSetStores.has(key)) {
            storeValue = isEmpty(storeValue)
                ? []
                : [...(storeValue as Set<string>)];
        }
        return key + divider + JSON.stringify(storeValue) + divider;
    };
    const copySave = () => {
        let text = document.getElementById("generatedSave") as HTMLInputElement;
        text.select();
        text.setSelectionRange(0, text.value.length);
        document.execCommand("copy");
        copiedSave = true;
    };
    const loadSave = () => {
        if (loadText === "showmethemoney") {
            const resources = get(ResourcesStore.resources);
            for (let [name, resource] of Object.entries(resources)) {
                if (resource.limit < Number.MAX_VALUE - 5000) {
                    ResourcesStore.resources.setResourceLimit(name, 100000000);
                    ResourcesStore.resources.setResourceValue(
                        name,
                        resources[name].limit
                    );
                }
            }
            return;
        } else if (loadText === "showmesomemoney") {
            const resources = get(ResourcesStore.resources);
            for (let [name, resource] of Object.entries(resources)) {
                ResourcesStore.resources.incrementResourceValue(name, 1000);
            }
            return;
        }
        let stringValues = [];
        try {
            stringValues = atob(loadText).split(divider);
        } catch {
            loadError = true;
            return;
        }
        let storeValues = [];
        for (let val of stringValues) {
            isJsonString(val)
                ? storeValues.push(JSON.parse(val))
                : storeValues.push(val);
        }
        try {
            while (storeValues.length > 0) {
                let category = storeValues.shift();
                switch (category) {
                    case STORE_TYPES.BUTTON_COSTS:
                        setStoreValues(ButtonCostsStore, storeValues);
                        break;
                    case STORE_TYPES.GAME_STATE:
                        setStoreValues(GameStateStore, storeValues);
                        break;
                    case STORE_TYPES.MILITARY:
                        setStoreValues(MilitaryStore, storeValues);
                        break;
                    case STORE_TYPES.RESOURCES:
                        setStoreValues(ResourcesStore, storeValues);
                        break;
                    case STORE_TYPES.WORKERS:
                        setStoreValues(WorkersStore, storeValues);
                        break;
                    case STORE_TYPES.LIBRARY:
                        setStoreValues(LibraryStore, storeValues);
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            console.log(error);
            loadError = true;
            loadSuccess = false;
            return;
        }
        loadError = false;
        loadSuccess = true;
    };
    const isJsonString = (jsonString: string): boolean => {
        try {
            const o = JSON.parse(jsonString);
            return true;
        } catch (e) {}

        return false;
    };
    const setStoreValues = (stores: any, storeValues: any[]) => {
        while (storeValues.length > 0 && !storeCategories.has(storeValues[0])) {
            let storeName = storeValues.shift();
            const storeValue = hashSetStores.has(storeName)
                ? new Set<string>(storeValues.shift())
                : storeValues.shift();
            // console.log(storeName);
            stores[storeName].set(storeValue);
        }
    };
</script>

{#if displayCredits}
    <div
        class="absolute flex flex-col w-95 h-95 z-100 rpgui-container framed-golden"
    >
        <p class="flex justify-center mt-4 mb-10">Credits</p>
        <p>CSS framework</p>
        <br />
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ronenness.github.io/RPGUI/"
        >
            https://ronenness.github.io/RPGUI/
        </a>
        <br />
        <p>Sprites: Battle for Wesnoth</p>
        <br />
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/wesnoth/wesnoth"
        >
            https://github.com/wesnoth/wesnoth
        </a>
        <br />
        <p>Icons: Shikashi's Fantasy Icons Pack</p>
        <br />
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://cheekyinkling.itch.io/shikashis-fantasy-icons-pack"
        >
            https://cheekyinkling.itch.io/shikashis-fantasy-icons-pack
        </a>
        <br />
        <p>Poison gas effect</p>
        <br />
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://jordan.trudgett.com/"
        >
            http://jordan.trudgett.com/
        </a>

        <div class="bottom-0 flex justify-center mt-10">
            <button
                class="flex items-center rpgui-button b-4"
                type="button"
                on:click={() => (displayCredits = false)}
            >
                <p>Close</p>
            </button>
        </div>
    </div>
{/if}
<div class="w-3/5 w-min-670px h-min-620px rpgui-container">
    <h4>
        Automatic saving hasn't been implemented yet so you have to save
        manually every time.
    </h4>
    <div class="flex flex-col justify-around h-full">
        <div>
            <h2>Export Save</h2>
            <h5>Copy and paste your generated save to a notepad</h5>
            <textarea id="generatedSave" class="" readonly>{saveText}</textarea>
            <button
                class="flex items-center float-left rpgui-button"
                type="button"
                on:click={() => {
                    generateSave();
                }}
            >
                <p>Generate Save</p>
            </button>
            <button
                class="flex items-center rpgui-button"
                type="button"
                on:click={() => {
                    copySave();
                }}
            >
                <p>Copy Save</p>
            </button>
            {#if copiedSave}
                <p>Copied to clipboard!</p>
            {/if}
        </div>
        <div class="mt-5">
            <h2>Import Save</h2>
            <h5>Copy and paste your exported save here</h5>
            <textarea bind:value={loadText} />
            <div class="flex justify-between">
                <button
                    class="flex items-center rpgui-button"
                    type="button"
                    on:click={() => {
                        loadSave();
                    }}
                >
                    <p>Load Save</p>
                </button>
                <button
                    class="flex items-center rpgui-button"
                    type="button"
                    on:click={() => (displayCredits = true)}
                >
                    <p>Credits</p>
                </button>
            </div>
            {#if loadError}
                <p class="">Save file format error. Could not load save.</p>
            {/if}
            {#if loadSuccess}
                <p class="">Save file loaded!</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .w-min-670px {
        min-width: 670px;
    }

    .h-min-620px {
        min-height: 620px;
    }

    .z-100 {
        z-index: 100;
    }

    .h-95 {
        height: 95%;
    }
    .w-95 {
        width: 95%;
    }
    .mt-10 {
        margin-top: 40px;
    }
</style>
