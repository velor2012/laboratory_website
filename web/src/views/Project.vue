<template>
  <v-card elevation="0">
    <div class="px-6">
      <v-card-title class="text-h6 text-main-color">
        <v-icon large left>
          mdi-hammer-screwdriver
        </v-icon>
        项目
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
        <ul v-show="!loading">
          <li v-for="(project, i) in projects" :key="i" class="py-3 px-5">
            <div class="d-flex flex-column">
              <div class="d-flex">
                <v-chip x-small class="px-2" color="#6c757d" text-color="white">
                  {{ project.fund_name_cn }}
                </v-chip>
                <div class="text-body-caption px-2">
                  {{ project.fund_name_en }}
                </div>
              </div>
                <div class="text-body-1 list_project_title px-2 pt-2">
                  {{ project.title }}
                </div>
                <div class="text-body-1 px-2 pt-2">
                  {{ `${project.start_date}~${project.end_date}` }}
                </div>
            </div>
          </li>
          <li 
          v-intersect="_.debounce(loadMore,300)"
          class="py-3 px-5" style="textAlign:center" v-show="!loading && isLoadingMore">
                <div
                    class="iconfont icon-loading fs-xl"
                ></div>
          </li>
        </ul>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
// @ is an alias to /src
import { myProjectApi } from "../api/project.api";
export default {
  name: "News",
  data() {
    return {
      projects: [],
      loading: true,
      isLoadingMore:false,
      isNoMore:false,
      pageSize:5,
      page:1,
      attrs: {
        class: "mb-6",
        elevation: 2,
      },
    };
  },
  methods: {
    goProject(link) {
      window.open(link);
    },
    async loadMore(){
        if(this.isLoadingMore || this.isNoMore) return
        this.isLoadingMore = true
        let res = await myProjectApi.findAllAPI(this.$axios, this.pageSize, this.page+1);
        if (res.success) {
            this.projects.push(...res.data);
            this.page += 1;
            if(res.data.length < 1){
                this.isNoMore = true
            }
            setTimeout(() => {
                this.isLoadingMore = false
            }, 300);
        }
    }
  },
  async mounted() {
    let res = await myProjectApi.findAllAPI(this.$axios, this.pageSize, this.page);
    if (res.success) {
      this.projects = res.data;
    }
    setTimeout(() => {
      this.loading = false;
    }, 300);
    // let res = await myProjectApi.findAllAPI(this.$axios,5,1)
    // this.projects = res.data
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sytle.scss";
.list_project_title {
  font-weight: bold;
}
.list_project_link:hover {
  cursor: pointer;
}
li::marker {
  unicode-bidi: isolate;
  font-variant-numeric: tabular-nums;
  text-transform: none;
  text-indent: 0px !important;
  text-align: start !important;
  text-align-last: start !important;
}
li {
  list-style-type: circle !important;
}
ul {
  li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  li:last-child {
    border-bottom: none;
  }
}
</style>
<style lang="scss">
.icon-loading{
    animation: rotate 3s linear  infinite;
}
@keyframes rotate{
    0%{
        transform: rotateZ(0deg);
    }
    25%{
        transform: rotateZ(90deg);
    }
    50%{
        transform: rotateZ(180deg);
    }
    75%{
        transform: rotateZ(270deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>
