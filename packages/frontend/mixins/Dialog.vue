<script>
export default {
  data () {
    return { open: false };
  },
  mounted () {
    const dialog = this.$children[0];
    this.open = dialog.open;
    dialog
      .$on('open', () => (this.open = true))
      .$on('close', () => (this.open = false));
  },
  methods: {
    show (...args) {
      return this.$children[0].show(...args);
    },
    close (...args) {
      return this.$children[0].close(...args);
    }
  }
};
</script>
