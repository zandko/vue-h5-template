<script>
export default {
  created() {
    const { params: { path }, query } = this.$route
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
