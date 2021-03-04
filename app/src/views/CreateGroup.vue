<template>
  <div class="home flex flex-col items-center">
    <CreateGroupForm/>
  </div>
</template>

<script>
import CreateGroupForm from '../components/forms/create-group-form/CreateGroupForm';

export default {
  name: "CreateGroup",
  components: {CreateGroupForm }
};
</script>
