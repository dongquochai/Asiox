var ndService = new NguoiDungServices();
var validation = new Validation();
function layDSND() {
  ndService
    .layDS()
    .then(function (result) {
      hienThiTable(result.data);
      ndService.mang = result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
layDSND();

function hienThiTable(mangND) {
  var content = "";
  var count = 1;
  mangND.map(function (nd) {
    content += `
        <tr>
            <td>${count}</td>
            <td>${nd.taiKhoan}</td>
            <td>${nd.matKhau}</td>
            <td>${nd.hoTen}</td>
            <td>${nd.email}</td>
            <td>${nd.ngonNgu}</td>
            <td>${nd.loaiND}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNguoiDung('${nd.id}')" >Xóa</button>
                <button data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="xemChiTiet('${nd.id}')" >Xem</button>
            </td>
        </tr>     
    `;
    count++;
  });
  document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}

document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", function () {
    document.querySelector(
      "#myModal .modal-footer"
    ).innerHTML = `<button class ='btn btn-success' onclick = 'themNguoiDung()'>Thêm</button>`;
  });

function themNguoiDung() {
  var taiKhoan = document.getElementById("TaiKhoan").value;
  document.getElementById("TaiKhoan").disabled = false;

  var hoTen = document.getElementById("HoTen").value;
  var matKhau = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var ngonNgu = document.getElementById("loaiNgonNgu").value;
  var hinhAnh = document.getElementById("HinhAnh").value;
  var loaiND = document.getElementById("loaiNguoiDung").value;
  var moTa = document.getElementById("MoTa").value;

  var isValid = true;
  isValid &=
    validation.checkEmpty(
      taiKhoan,
      "tbTKND",
      "Tài khoản không được để trống"
    ) &&
    validation.checkAcc(
      taiKhoan,
      "tbTKND",
      "Tài khoản không được trùng",
      ndService.mang
    );
  isValid &=
    validation.checkEmpty(hoTen, "tbTenND", "Họ Tên không được để trống") &&
    validation.checkName(hoTen, "tbTenND", "Họ Tên chỉ chứa kí tự chữ");

  isValid &=
    validation.checkEmpty(matKhau, "tbMKND", "Mật khẩu không được để trống") &&
    validation.checkPass(
      matKhau,
      "tbMKND",
      "Mật khẩu phải chứa 6-8 kí tự, ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  isValid &=
    validation.checkEmpty(email, "tbEmailND", "Email không được để trống") &&
    validation.checkEmail(email, "tbEmailND", "Email không đúng định dạng");

  isValid = validation.checkEmpty(
    hinhAnh,
    "tbHinhND",
    "Hình Ảnh không được để trống"
  );

  isValid &= validation.checkSelect(
    "loaiNguoiDung",
    "tbLoaiND",
    "Xin Chọn loại người dùng"
  );

  isValid &= validation.checkSelect(
    "loaiNgonNgu",
    "tbNNND",
    "Xin Chọn loại ngôn ngữ"
  );

  isValid &=
    validation.checkEmpty(moTa, "tbMoTaND", "Mô tả không được để trống") &&
    validation.checkLength(moTa, "tbMoTaND", "Mô tả không vượt quá 60 kí tự");

  if (isValid) {
    var nd = new NguoiDung(
      taiKhoan,
      hoTen,
      matKhau,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh
    );
    
    ndService
      .themNDung(nd)
      .then(function (result) {
        
        layDSND();
        document.querySelector("#myModal .close").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
function xoaNguoiDung(id) {
  ndService
    .xoaNDung(id)
    .then(function (result) {
      layDSND();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function xemChiTiet(id) {
  ndService
    .layChiTiet(id)
    .then(function (result) {
      

      document.getElementById("TaiKhoan").value = result.data.taiKhoan;
      document.getElementById("TaiKhoan").disabled = true;

      document.getElementById("HoTen").value = result.data.hoTen;
      document.getElementById("MatKhau").value = result.data.matKhau;
      document.getElementById("Email").value = result.data.email;
      document.getElementById("HinhAnh").value = result.data.hinhAnh;
      document.getElementById("loaiNguoiDung").value = result.data.loaiND;
      document.getElementById("loaiNgonNgu").value = result.data.ngonNgu;
      document.getElementById("MoTa").value = result.data.moTa;

      document.querySelector("#myModal .modal-footer").innerHTML = `
        <button class='btn btn-success' onclick="capNhatND('${result.data.id}')" >Cập Nhật</button>
      `;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function capNhatND(id) {
  var taiKhoan = document.getElementById("TaiKhoan").value;
  var hoTen = document.getElementById("HoTen").value;
  var matKhau = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var hinhAnh = document.getElementById("HinhAnh").value;
  var loaiND = document.getElementById("loaiNguoiDung").value;
  var ngonNgu = document.getElementById("loaiNgonNgu").value;
  var moTa = document.getElementById("MoTa").value;

  var isValid = true;
  isValid &=
    validation.checkEmpty(hoTen, "tbTenND", "Họ Tên không được để trống") &&
    validation.checkName(hoTen, "tbTenND", "Họ Tên chỉ chứa kí tự chữ");

  isValid &=
    validation.checkEmpty(matKhau, "tbMKND", "Mật khẩu không được để trống") &&
    validation.checkPass(
      matKhau,
      "tbMKND",
      "Mật khẩu phải chứa 6-8 kí tự, ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  isValid &=
    validation.checkEmpty(email, "tbEmailND", "Email không được để trống") &&
    validation.checkEmail(email, "tbEmailND", "Email không đúng định dạng");

  isValid = validation.checkEmpty(
    hinhAnh,
    "tbHinhND",
    "Hình ảnh không được để trống"
  );

  isValid &= validation.checkSelect(
    "loaiNguoiDung",
    "tbLoaiND",
    "Xin Chọn loại người dùng"
  );

  isValid &= validation.checkSelect(
    "loaiNgonNgu",
    "tbNNND",
    "Xin Chọn loại ngôn ngữ"
  );

  isValid &=
    validation.checkEmpty(moTa, "tbMoTaND", "Mô tả không được để trống") &&
    validation.checkLength(moTa, "tbMoTaND", "Mô tả không vượt quá 60 kí tự");

  if (isValid) {
    var nd = new NguoiDung(
      taiKhoan,
      hoTen,
      matKhau,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh
    );

    ndService
      .capNhat(id, nd)
      .then(function (result) {
        console.log(result.data);
        layDSND();
        document.querySelector("#myModal .close").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

//Reset form
function resetForm() {
  document.querySelector(".modal-body").reset();
  document.querySelector("#TaiKhoan").disabled = false;
  document.getElementById("tbTKND").innerHTML = "";
  document.getElementById("tbTenND").innerHTML = "";
  document.getElementById("tbMKND").innerHTML = "";
  document.getElementById("tbEmailND").innerHTML = "";
  document.getElementById("tbHinhND").innerHTML = "";
  document.getElementById("tbLoaiND").innerHTML = "";
  document.getElementById("tbNNND").innerHTML = "";
  document.getElementById("tbMoTaND").innerHTML = "";
}
document.querySelector(".close").addEventListener("click", resetForm);
document.querySelector("#myModal").addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    resetForm();
  }
});