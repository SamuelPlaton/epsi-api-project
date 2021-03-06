<template>
  <Navigation title="S'inscrire">
    <div class="home flex flex-col items-center">
      <RegisterForm/>
    </div>
  </Navigation>
</template>

<script>
import Overlay from "../components/popups/popup/local-components/Overlay";
import Popup from "../components/popups/popup/Popup";
// import register popup
import RegisterForm from "../components/forms/register-form/RegisterForm";
import Navigation from "../components/navigation/Navigation";

export default {
  name: "Register",
  components: {Navigation, RegisterForm, Popup, Overlay}
};
</script>
