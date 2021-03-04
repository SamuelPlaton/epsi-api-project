<template>
  <div class="home flex flex-col items-center">
    <JoinGroupPopup/>
  </div>
</template>

<script>
import Overlay from "../components/popups/popup/local-components/Overlay";
import Popup from "../components/popups/popup/Popup";
import JoinGroupPopup from "../components/popups/join-group-popup/JoinGroupPopup";
export default {
  name: "Home",
  components: {JoinGroupPopup, Popup, Overlay}
};
</script>
