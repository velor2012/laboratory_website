<template>
  <v-card elevation="0">
    <div class="px-6">
      <v-card-title class="text-h6 text-main-color">
        <v-icon large left>
          mdi-account-group
        </v-icon>
        成员
      </v-card-title>
      <v-divider />
      <div v-show="loading">
        <div
          class="py-4 teachers_info d-flex flex-column align-center justify-center"
          v-for="i in 4"
          :key="i"
        >
        <v-skeleton-loader type="list-item" width="20%"/>
          <div class="d-flex justify-center flex-wrap">
            <div
              v-for="i in 3"
              :key="i"
              class="py-2 px-8 d-flex flex-column justify-center align-center"
            >
                <v-skeleton-loader type="avatar"/>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!loading">
        <div
          class="py-4 teachers_info d-flex flex-column align-center justify-center"
        >
          <span class="text-h5 text-main-color text-bold">导师(Teachers)</span>
          <div class="d-flex justify-center flex-wrap">
            <div
              v-for="(teacher, i) in teachers"
              :key="i"
              class="py-2 px-8 d-flex flex-column justify-center align-center"
            >
              <v-avatar color="primary" size="128">
                <v-img
                  :src="teacher.avatar ? teacher.avatar : 'default.jpg'"
                ></v-img>
              </v-avatar>
              <span class="pt-4 text-body-1">{{ teacher.name }}</span>
            </div>
          </div>
        </div>

        <div
          class="py-4 advisers_info d-flex flex-column align-center justify-center"
        >
          <span class="text-h5 text-main-color text-bold">顾问(Advisers)</span>
          <div class="d-flex justify-center flex-wrap">
            <div
              v-for="(adviser, i) in advisers"
              :key="i"
              class="py-2 px-8 d-flex flex-column justify-center align-center"
            >
              <v-avatar color="primary" size="128">
                <v-img
                  :src="adviser.avatar ? adviser.avatar : 'default.jpg'"
                ></v-img>
              </v-avatar>
              <span class="pt-4 text-body-1">{{ adviser.name }}</span>
            </div>
          </div>
        </div>

        <div
          class="py-4 stus_info d-flex flex-column align-center justify-center"
        >
          <span class="text-h5 text-main-color text-bold">学生(Students)</span>
          <div class="d-flex justify-center flex-wrap">
            <div
              v-for="(stu, i) in inSchoolStus"
              :key="i"
              class="py-2 px-8 d-flex flex-column justify-center align-center"
            >
              <v-avatar color="primary" size="128">
                <v-img :src="stu.avatar ? stu.avatar : 'default.jpg'"></v-img>
              </v-avatar>
              <span class="pt-4 text-body-1">{{ stu.name }}</span>
            </div>
          </div>
        </div>

        <div class="py-4 stus_info">
          <span class="text-h5 text-main-color text-bold"
            >已毕业学生(Students)</span
          >
          <v-simple-table class="py-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    姓名
                  </th>
                  <th class="text-center">
                    学位
                  </th>
                  <th class="text-center">
                    就业方向
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stu, i) in GraduatedStus" :key="i">
                  <td>
                    {{ stu.name }}
                  </td>
                  <td>
                    {{ stu.degree }}
                  </td>
                  <td>
                    {{ stu.graduate_orientation }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div
            v-intersect="_.debounce(loadMore, 300)"
            class="py-3 px-5"
            style="textAlign:center"
            v-show="!loading && isLoadingMore"
          >
            <div class="iconfont icon-loading fs-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
// @ is an alias to /src
import { myTeacherApi } from "../api/teacher.api";
import { myResearcherApi } from "../api/researcher.api";
import { myStuApi } from "../api/stu.api";
import { myAdviserApi } from "../api/adviser.api";
export default {
  name: "Member",
  data() {
    return {
      inSchoolStus: [],
      GraduatedStus: [],
      teachers: [],
      advisers: [],
      researchers: true,
      isLoadingMore: false,
      loading: true,
      isNoMore: false,
      pageSize: 5,
      page: 1,
      attrs: {
        class: "mb-6",
        elevation: 2,
      },
    };
  },
  methods: {
    loadMore() {
      if (this.isLoadingMore || this.isNoMore) return;
      this.isLoadingMore = true;
      myStuApi
        .findAllGraduatedAPI(this.$axios, this.pageSize, this.page + 1)
        .then((res) => {
          if (res.success) {
            console.log("loading_done");
            if (res.data.length < 1) {
              this.isNoMore = true;
            }
            this.GraduatedStus.push(...res.data);
            this.page++;
            this.isLoadingMore = false;
          }
        });
    },
  },
  async mounted() {
    let p1 = myTeacherApi
      .findAllAPI(this.$axios, this.pageSize, this.page)
      .then((res) => {
        if (res.success) {
          this.teachers = res.data;
        }
      });
    let p2 = myStuApi
      .findAllInSchoolAPI(this.$axios, this.pageSize, this.page)
      .then((res) => {
        if (res.success) {
          this.inSchoolStus = res.data;
        }
      });
    let p3 = myStuApi
      .findAllGraduatedAPI(this.$axios, this.pageSize, this.page)
      .then((res) => {
        if (res.success) {
          this.GraduatedStus = res.data;
        }
      });
    let p4 = myResearcherApi
      .findAllAPI(this.$axios, this.pageSize, this.page)
      .then((res) => {
        if (res.success) {
          this.researchers = res.data;
        }
      });
    let p5 = myAdviserApi
      .findAllAPI(this.$axios, this.pageSize, this.page)
      .then((res) => {
        if (res.success) {
          this.advisers = res.data;
        }
      });
    Promise.all([p1, p2, p3, p4, p5]).then((result) => {
        setTimeout(() => {
          this.loading = false;
        }, 300);
    });
  },
};
</script>
<style lang="scss">
.v-skeleton-loader__avatar{
    height: 8rem!important;
    width: 8rem!important;
}
</style>