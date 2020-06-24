import { SET_ALL_KIDS, UNSET_ALL_KIDS } from "../mutation-types";

const state = {
  allKids: [],
};
const getters = {
  getAllKids(state) {
    return state.allKids;
  },
};
// mutations
const mutations = {
  //   [SET_ALL_KIDS](state, allUpdates) {
  //     state.allKids = allUpdates;
  //   },
  //   [UNSET_ALL_KIDS](state) {
  //     state.allKids = [];
  //   },
};
// Actions
const actions = {
  fetchAllKids({ commit }) {
    console.log("in fetchAllKids");

    return new Promise((resolve, reject) => {
      var uid = localStorage.getItem("userID");
      let kidsArr = [];
      fs.collection("users")
        .doc(uid)
        .collection("kids")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log("doc.data()doc.data()doc.data()doc.data()", doc.data());
            kidsArr.push(doc.data());
          });
          console.log("kidsArr kidsArr kidsArr", kidsArr);
          commit("SET_ALL_KIDS", kidsArr);
        });
    });
  },
  addKid({ commit }, kid) {
    console.log("in add kid", kid);
    let imageUrl;
    let studentId = "sp";
    return new Promise((resolve, reject) => {
      var uid = localStorage.getItem("userID");
      let filename = kid.photo.name;

      fs.collection("users")
        .doc(uid)
        .collection("kids")
        .add({
          fname: kid.fname,
          lname: kid.lname,
          age: kid.age,
          gender: kid.gender,
          remark: kid.remark,
          color: kid.color,
          createdAt: new Date(),
        })
        .then((obj) => {
          console.log(obj);
          studentId = obj.id;
          resolve(studentId);
          //   console.log(kid.photo);
          //   let ext = filename.slice(filename.lastIndexOf("."));
          //   return fb
          //     .storage()
          //     .ref(studentId + "_" + ext)
          //     .put(kid.photo);
        });
      // .then((fsPhoto) => {
      //   console.log("fsPhoto: ------>", fsPhoto);
      //   imageUrl = fsPhoto.metadata.downloadURLs[0];
      //   console.log("imageUrl: ------>", imageUrl);
      // });

      //   console.log("inside addKid ..");
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
