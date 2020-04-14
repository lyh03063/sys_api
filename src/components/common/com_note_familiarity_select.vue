



<template>
  <div class>
    <familiarity_select
      v-model="doc.familiarityDoc"
      :data="doc"
      data-type="note"
      idKey="_idRel2"
      :key="doc._id"
    ></familiarity_select>
  </div>
</template>

<script>
export default {

  name: "com_note_familiarity_select",
  components: {
    familiarity_select: () => import("@/components/common/familiarity_select.vue"),

  },
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {};
  },
  methods: {}
};
</script>
