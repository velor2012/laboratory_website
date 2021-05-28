<template>
  <v-app id="app">
    <v-app-bar
      app
      flat
      :dark="isTop"
      :elevation="isTop ? 0 : 10"
      v-scroll="onScroll"
    >
      <v-img src="@/assets/log2.png" contain max-width="100" max-height="100%">
      </v-img>
      <div class="laboratory_name">
        <span class="text-h5">AI & Multimedia Lab</span>
        <span>人工智能与多媒体研究室</span>
      </div>
      <v-tabs v-model="tab">
        <v-tab
          :outlined="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
          <div class="mtab_item">
            <span>{{ item.name }}</span>
            <span>{{ item.cn }}</span>
          </div>
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main class="main">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer>
      <v-row>
        <v-spacer />
        <v-col cols="3">
          <v-list-item>
            <v-list-item-content class="d-flex flex-column align-start">
              <v-list-item-title>Contract us</v-list-item-title>
              <v-list-item-subtitle v-for="(item, i) in contract" :key="i"
                >{{ item.k }}: {{ item.v }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-spacer />
        <v-col cols="3">
          <v-list-item>
            <v-list-item-content class="d-flex flex-column align-start">
              <v-list-item-title>Related Connection</v-list-item-title>
              <v-list-item-subtitle
                v-for="(item, i) in related_connection"
                :key="i"
                ><a :href="item.v">{{ item.k }}</a></v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-spacer />
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
import HomeVue from "./views/Home.vue";
export default {
  // components: {
  //   HomeVue
  // },
  data() {
    return {
      tab: null,
      isTop: true,
      items: [
        { name: "Home", cn: "主页", link: "/home" },
        { name: "News", cn: "新闻", link: "/news" },
        { name: "Members", cn: "成员", link: "/member" },
        { name: "Paper", cn: "论文", link: "/paper" },
        { name: "Project", cn: "项目", link: "/project" },
        { name: "Competition", cn: "比赛", link: "/competition" },
      ],
      contract: [
        { k: "addr", v: "武汉大学本科生院楼六楼" },
        { k: "phone", v: "13248201775" },
        { k: "email", v: "2281675608" },
      ],
      related_connection: [
        { k: "CS", v: "http://aim-nercms.whu.edu.cn/" },
        { k: "NERCMS", v: "http://multimedia.whu.edu.cn/" },
        { k: "人工智能研究院", v: "http://ai.whu.edu.cn/" },
      ],
      tab_items: [HomeVue, HomeVue, HomeVue, HomeVue, HomeVue, HomeVue],
    };
  },
  methods: {
    onScroll(e) {
      // console.log(window.pageYOffset)
      this.isTop = window.pageYOffset > 10 ? false : true;
    },
  },
};
</script>

<style lang="scss" scope>
@import "@/assets/sytle.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}

.laboratory_name {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  white-space: nowrap;
}
.mtab_item {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}
.v-list-item__title {
  align-self: start !important;
}
.v-card__title {
  .v-icon {
    color: $main-text-color;
  }
}
.main{
    background-color: #eee;
}
</style>
