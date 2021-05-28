<template>
  <div>
    <v-carousel
    cycle
    >
      <v-carousel-item
      v-for="(item,i) in carousel_items"
      :key = i
      :src = item
      >

      </v-carousel-item> 
    </v-carousel>

    <v-row justify="space-around">
      <v-col cols="7">
        <v-card
          elevation=0
        >
        <v-card-title class="blue_card_title text-h6">
          <v-icon
          large
          left
          >
            mdi-book-open-variant
          </v-icon>
        Recent Publications(最新论文)
        </v-card-title>
        
        <v-divider/>
        <v-row class="mt-1" dense>
          <v-col cols="6" v-for="(paper,i) in papers" :key="i">
            <v-card>
                <v-card-subtitle style="textAlign:left;backgroundColor:rgba(0,0,0,.03)" class="pb-0">
                    <!-- {{j+(i-1)*2}} -->
                {{paper.conf}}
                </v-card-subtitle>
                <v-divider/>
                <v-card-title class="text-body-1" style="textAlign:left">{{paper.title}}</v-card-title>
                <v-card-text class="text-body-1" style="textAlign:left">{{paper.author.join(',')}}</v-card-text>

              <v-card-actions class="flex-row-reverse">
                <v-btn
                  color="#4b6dc6"
                  :to="`paper/${paper.id}`"
                >
                  <span class="text-white iconfont icon-PDF fs-xl"></span>
                  <span class="text-white iconfont paper-btn">Paper</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
        <v-card
          elevation=0
        >
        <v-card-title class="blue_card_title text-h6">
          <v-icon
          large
          left
          >
            mdi-home-search-outline
          </v-icon>
        About Us(关于我们)
        </v-card-title>
        <v-card-text class="text-body-1" style="textAlign:left">
          {{about_us}}
        </v-card-text>
        <v-divider/>
        </v-card>
          </v-col>


        <v-col cols="12">
        <v-card
          elevation=0
        >
        <v-card-title class="blue_card_title text-h6">
          <v-icon
          large
          left
          >
            mdi-newspaper-variant-outline
          </v-icon>
        News(新闻)
        </v-card-title>
        <v-card-text class="text-body-1" style="textAlign:left">
          {{about_us}}
        </v-card-text>
        <v-divider/>
        </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import {myPaperApi} from "../api/paper.api"
export default {
  name: "Home",
  components: {},
  data() {
    return {
      papers: [],
      carousel_items: [
        "/carousels/general1.jpg",
        "/carousels/whu_1_1.jpg",
        "/carousels/whu_3_3.jpg",
      ],
      about_us:`
      人工智能与多媒体研究室隶属于武汉大学国家多媒体软件工程技术研究中心和人工智能研究院。 研究室现有1名教授，1名副教授，4名博士，21名硕士，10名访问学生，主要从事多媒体内容 分析与检索、视频监控与智能分析、遥感图像分析与处理、智能电网等方面的研究和开发工作， 拥有XXX平台一套，XXXXXXXX。在Altrans和ICME比赛中取得了优异成绩。
      同时研究室和日本国立信息学研究 所，台湾清华大学等多家海外顶尖科研机构保持着紧密联系和合作。
      `
    };
  },
    async mounted(){
        let res = await myPaperApi.findAllAPI(this.$axios,5,1)
        this.papers = res.data
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/sytle.scss";
.blue_card_title{
  color: $main-text-color;
}
.paper-btn{
    text-transform: capitalize;
}
</style>
