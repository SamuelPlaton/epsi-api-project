<template>
  <div class="home flex flex-col items-center">
    <RegisterForm/>
  </div>
</template>

<script>
import Overlay from "../components/popups/popup/local-components/Overlay";
import Popup from "../components/popups/popup/Popup";
// import register popup
import RegisterForm from "../components/forms/register-form/RegisterForm";
export default {
  name: "Register",
  components: {RegisterForm, Popup, Overlay}
};
</script>
