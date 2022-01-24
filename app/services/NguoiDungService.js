function NguoiDungServices() {
    this.mang = [];
    this.them = function (nd) {
      this.mang.push(nd);
    };
  
    this.layDS = function () {
      return axios({
        method: "get",
        url: "https://61ee31c5d593d20017dbacba.mockapi.io/QLND",
      });
    };
  
    this.themNDung = function (nd) {
      return axios({
        method: "post",
        url: "https://61ee31c5d593d20017dbacba.mockapi.io/QLND",
        data: nd,
      });
    };
    this.xoaNDung = function (id) {
      return axios({
        method: "delete",
        url: `https://61ee31c5d593d20017dbacba.mockapi.io/QLND/${id}`,
      });
    };
    this.layChiTiet = function (id) {
      return axios({
        method: "get",
        url: `https://61ee31c5d593d20017dbacba.mockapi.io/QLND/${id}`,
      });
    };
    this.capNhat = function (id, nd) {
      return axios({
        method: "put",
        url: `https://61ee31c5d593d20017dbacba.mockapi.io/QLND/${id}`,
        data: nd,
      });
    };
  }