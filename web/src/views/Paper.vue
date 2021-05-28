<template>
  <v-card elevation="0">
    <div class="px-6">
      <v-card-title class="text-h6 text-main-color">
        <v-icon large left>
          mdi-book-open-variant
        </v-icon>
        论文
      </v-card-title>
      <v-divider />
      <v-card-text class="text-body-1" style="textAlign:left">
        <v-skeleton-loader
          v-bind="attrs"
          type="list-item-two-line"
          v-for="n in 8"
          :key="n"
          v-show="loading"
        >
        </v-skeleton-loader>
        <v-list dense>
          <div v-show="!loading">
            <v-list-item-group v-for="(item, i) in papers" :key="i">
              <v-list-item-title class="text-h5 py-3 list_paper_year">{{
                item.year
              }}</v-list-item-title>
              <v-list-item
                inactive
                v-for="(paper, i) in item.papers"
                :key="i"
                style="border:1px solid rgba(0,0,0,.125)"
              >
                <v-row class="py-1">
                  <v-col :cols="8">
                    <div class="text-body-1 list_paper_title">
                      {{ paper.title }}
                    </div>
                    <div class="text-body-2">
                      {{ paper.conf }}
                    </div>
                    <div class="text-caption mt-2">
                      {{ paper.author ? paper.author.join(", ") : "" }}
                    </div>
                  </v-col>
                  <v-spacer />
                  <v-col
                    :cols="2"
                    class="d-flex flex-column justify-center align-end"
                  >
                    <div class="list_paper_link" @click="goPaper(paper.link)">
                      <span
                        class="iconfont icon-PDF fs-xl"
                        :class="{
                          'text-blue':
                            paper.link != null && paper.link != undefined,
                        }"
                      ></span>
                      <span
                        class="iconfont paper-btn"
                        :class="{
                          'text-blue':
                            paper.link != null && paper.link != undefined,
                        }"
                        >Paper</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list-item-group>
          </div>
        </v-list>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
// @ is an alias to /src
import { myPaperApi } from "../api/paper.api";
export default {
  name: "Paper",
  data() {
    return {
      papers: [],
      start_year: 2019,
      cur_date: new Date(),
      end_year: 2019,
      loading: true,
      attrs: {
        class: "mb-6",
        elevation: 2,
      },
    };
  },
  methods: {
    goPaper(link) {
      window.open(link);
    },
  },
  async mounted() {
    this.end_year = this.cur_date.getFullYear();
    let year = this.start_year;
    while (year <= this.end_year) {
      let a = [];
      let res = await myPaperApi.findByYearAPI(this.$axios, year);
      if (res.success) {
        a = res.data;
        if (a.length > 0) {
          this.papers.push({ year: year, papers: a });
        }
      }
      year++;
    }
    setTimeout(() => {
      this.loading = false;
    }, 300);
    // let res = await myPaperApi.findAllAPI(this.$axios,5,1)
    // this.papers = res.data
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sytle.scss";
.list_paper_title {
  font-weight: bold;
}
.list_paper_link:hover {
  cursor: pointer;
}
.list_paper_year {
  text-align: center;
  color: $main-text-color;
  font-weight: bold;
}
</style>
