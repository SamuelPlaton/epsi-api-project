<template>
  <Navigation title="Créer un groupe">
    <div class="home flex flex-col items-center">
      <CreateGroupForm/>
    </div>
  </Navigation>
</template>

<script>
import CreateGroupForm from '../components/forms/create-group-form/CreateGroupForm';
import {Navigation} from "../components";

export default {
  name: "CreateGroup",
  components: {CreateGroupForm, Navigation}
};
</script>
