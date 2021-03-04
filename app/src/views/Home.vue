<template>
  <div class="home flex flex-col items-center">
    <LoginForm/>
  </div>
</template>

<script>
import Overlay from "../components/popups/popup/local-components/Overlay";
import Popup from "../components/popups/popup/Popup";
import JoinGroupPopup from "../components/popups/join-group-popup/JoinGroupPopup";
import LoginForm from "../components/forms/login-form/LoginForm";
export default {
  name: "Home",
  components: {LoginForm, JoinGroupPopup, Popup, Overlay}
};
</script>
