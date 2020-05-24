<template>
  <b-container fluid>
    <b-form-group label="Profile">
      <b-row>
        <b-col cols="3">
          <b-form-group label="Network Connections">
            <b-form-input type="number" v-model="stats.networkConnections"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Network Groups">
            <b-form-input type="number" v-model="stats.networkGroups"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Network Pages">
            <b-form-input type="number" v-model="stats.networkPages"/>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-group label="Network Hashtags">
            <b-form-input type="number" v-model="stats.networkHashtags"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>
    
    <b-form-group label="Profile">
      <b-row>
        <b-col cols="3">
          <b-form-group label="Last 90 days Views">
            <b-form-input type="number" v-model="stats.n90daysViews"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Last 7 days Search Appearance">
            <b-form-input type="number" v-model="stats.n7DaysSearch"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>

    <b-form-group label="Profile" class="w-100 border-bottom border-primary">
      <b-row>
        <b-col cols="3">
          <b-form-group label="Current SSI Index">
            <b-form-input type="number" v-model="stats.currentSSIIndex"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Team SSI Rank">
            <b-form-input type="number" v-model="stats.teamSSIRank"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Team SSI Rank Of Total">
            <b-form-input type="number" v-model="stats.teamSSIRankOfTotal"/>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-group label="Industry SSI Rank Top %">
            <b-form-input type="number" v-model="stats.industrySSIRankTopP"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Network SSI Rank Top %">
            <b-form-input type="number" v-model="stats.networkSSIRankTopP"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>

    <b-form-group label="Groups" class="mt-5 w-100 border-bottom border-primary">
      <b-row>
        <b-col cols="3">
          <b-form-group label="Group 1 Members">
            <b-form-input type="number" v-model="stats.g1Members"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Group 2 Members">
            <b-form-input type="number" v-model="stats.g2Members"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Group 3 Members">
            <b-form-input type="number" v-model="stats.g3Members"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>

    <b-form-group label="Company 1" class="mt-5 w-100 border-bottom border-primary">
      <b-row>
        <b-col cols="3">
          <b-form-group label="Page Followers">
            <b-form-input type="number" v-model="stats.company1PageFollowers"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Page Last 30 days Unique Visitors">
            <b-form-input type="number" v-model="stats.company1UniqueVisitors30"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Page Last 30 days New Followers">
            <b-form-input type="number" v-model="stats.company1NewFollowers30"/>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-group label="Page Last 30 days Post Impressions">
            <b-form-input type="number" v-model="stats.company1PostImpressions30"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Page Last 30 days Custom Button Clicks">
            <b-form-input type="number" v-model="stats.company1ButtonClicks30"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>

    <b-form-group label="Company 2" class="mt-5 w-100 border-bottom border-primary">
      <b-row>
        <b-col cols="3">
          <b-form-group label="Page Followers">
            <b-form-input type="number" v-model="stats.company2PageFollowers"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Page Last 30 days Unique Visitors">
            <b-form-input type="number" v-model="stats.company2UniqueVisitors30"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Page Last 30 days New Followers">
            <b-form-input type="number" v-model="stats.company2NewFollowers30"/>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-group label="Page Last 30 days Post Impressions">
            <b-form-input type="number" v-model="stats.company2PostImpressions30"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Page Last 30 days Custom Button Clicks">
            <b-form-input type="number" v-model="stats.company2ButtonClicks30"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>

    <b-form-group label="Company 3" class="mt-5 w-100 border-bottom border-primary">
      <b-row>
        <b-col cols="3">
          <b-form-group label="Page Followers">
            <b-form-input type="number" v-model="stats.company3PageFollowers"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Page Last 30 days Unique Visitors">
            <b-form-input type="number" v-model="stats.company3UniqueVisitors30"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Page Last 30 days New Followers">
            <b-form-input type="number" v-model="stats.company3NewFollowers30"/>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-group label="Page Last 30 days Post Impressions">
            <b-form-input type="number" v-model="stats.company3PostImpressions30"/>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Page Last 30 days Custom Button Clicks">
            <b-form-input type="number" v-model="stats.company3ButtonClicks30"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>

    <b-form-group>
      <b-button variant="primary" @click="submit">Submit</b-button>
    </b-form-group>
  </b-container>
</template>

<script>
  export default {
    data: () => ({
      stats: {
        networkConnections: '0',
        networkGroups: '0',
        networkPages: '0',
        networkHashtags: '0',
        n90daysViews: '0',
        n7DaysSearch: '0',
        currentSSIIndex: '0',
        teamSSIRank: '0',
        teamSSIRankOfTotal: '0',
        industrySSIRankTopP: '0',
        networkSSIRankTopP: '0',
        g1Members: '0',
        g2Members: '0',
        g3Members: '0',
        company1PageFollowers: '0',
        company1UniqueVisitors30: '0',
        company1NewFollowers30: '0',
        company1PostImpressions30: '0',
        company1ButtonClicks30: '0',
        company2PageFollowers: '0',
        company2UniqueVisitors30: '0',
        company2NewFollowers30: '0',
        company2PostImpressions30: '0',
        company2ButtonClicks30: '0',
        company3PageFollowers: '0',
        company3UniqueVisitors30: '0',
        company3NewFollowers30: '0',
        company3PostImpressions30: '0',
        company3ButtonClicks30: '0',
      }
    }),

    async created() {
      try {
        const stats = await this.$store.dispatch('getLinkedInReports');

        if (stats.length) {
          const payload = {...stats[0]};
          delete payload.id;
          Object.assign(this.stats, payload);
        }
      } catch (err) {
          alert('An error occurred. For more information, please, checkout the Dev. console.');
      }
    },

    methods: {
      async submit() {
        try {
          const { stats } = this;
          Object.keys(stats).forEach((key) => {
            stats[key] = parseInt(stats[key], 10);
          });

          await this.$store.dispatch('postLinkedInStats', stats);

          alert('The report was successfully recorded.');
        } catch(err) {
          alert('An error occurred. Please verify your inputs and try again.');
        }
      },
    },
  }
</script>
