export default {
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
  },
  data() {
    return {
      count: 0,
    };
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`,
};
