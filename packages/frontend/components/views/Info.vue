<template>
  <app-view class="view-info">
    <div>
      <h2>Devterm Info</h2>
      <div v-if="data" class="cols">
        <div>
          <fieldset>
            <legend>General</legend>
            <table>
              <tbody>
                <tr>
                  <td>DevTerm Type:</td>
                  <td>{{ data.type }}</td>
                </tr>
                <tr>
                  <td>Battery Status:</td>
                  <td>
                    {{ data.battery }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Temperatures</legend>
            <table class="temperatures">
              <thead>
                <tr>
                  <td>Sensor</td>
                  <td>Celsius</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Printer:</td>
                  <td>{{ data.printerTemperature.toFixed(2) }}</td>
                </tr>
                <tr v-for="(value, index) in data.temperatures" :key="index">
                  <td>Zone {{ index+1 }}:</td>
                  <td>{{ value.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>
      </div>
    </div>
  </app-view>
</template>

<script>
import AppView from '../app/View.vue';
export default {
  components: {
    AppView
  },
  data () {
    return {
      data: null,
      refreshIntervalDuration: 3000,
      refreshInterval: null
    };
  },
  async mounted () {
    await this.refreshData();
    this.toggleRefreshInterval(true);
  },
  destroy () {
    this.toggleRefreshInterval(false);
  },
  methods: {
    async refreshData () {
      this.data = await this.$client.getInfo();
    },

    toggleRefreshInterval (value) {
      if (value) {
        this.$server.refresh();
        this.refreshInterval = window.setInterval(() => {
        }, this.refreshIntervalDuration);
      } else {
        window.clearInterval(this.refreshInterval);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.view-info {
  padding: 0 2em;

  & table {
    width: 100%;
    user-select: text;

    & thead {
      opacity: 0.6;
    }

    & td {
      padding: calc(4 / 16 * 1em) 0;

      &:nth-child(1) {
        /* width: 120px; */
      }

      &:nth-child(2) {
        text-align: right;
      }
    }
  }

  & h2 {
    margin: calc(24 / 24 * 1em) 0;
    margin-top: calc(16 / 24 * 1em);
    font-size: calc(24 / 16 * 1em);
  }

  & h3 {
    margin: calc(32 / 16 * 1em) 0;
  }

  & fieldset {
    margin: 0;

    /* margin: calc(24 / 16 * 1em) 0; */
    border: solid  var(--color-primary) 1px;

    & legend {
      padding: 0 calc(8 / 16 * 1em);
      font-size: calc(14 / 16 * 1em);
      line-height: calc(20 / 14);
      color: var(--color-secondary);
      background: var(--color-primary);
    }
  }

  & .cols {
    --offset: calc(16 / 16 * 1em);

    display: flex;
    flex-wrap: wrap;
    margin: calc(8 / 16 * 1em) calc(var(--offset) * -1);

    & > * {
      box-sizing: border-box;
      flex: 1;
      margin: 0 var(--offset);
    }
  }

  & ul {
    padding: 0;
    margin: calc(16 / 16 * 1em) 0;
    list-style: none;

    & li {
      & + li {
        margin-top: calc(8 / 16 * 1em);
      }

      & span {
        font-style: italic;
      }
    }
  }

  /* display: flex;
  align-items: center;
  justify-content: center;
  text-align: center; */
}
</style>
