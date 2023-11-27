document.addEventListener("DOMContentLoaded", async () => {
  axios.defaults.baseURL = "http://localhost:3000";

  let tbody = document.querySelector("tbody");
  let createProductModal = document.querySelector("#create-user-modal");
  let editProductModal = document.querySelector("#edit-user-modal");

  let createProductModalInstance = null;
  createProductModal.addEventListener("shown.bs.modal", function () {
    createProductModalInstance =
      bootstrap.Modal.getInstance(createProductModal);
  });

  let editProductModalInstance = null;
  editProductModal.addEventListener("shown.bs.modal", function () {
    editProductModalInstance = bootstrap.Modal.getInstance(editProductModal);
  });

  const updateProduct = (product) => {
    let tr = document.querySelector(`#product-${product.id}`);

    let tds = [
      product.id,
      `<img
            src="${product.image}"
            alt=""
            class="rounded-circle object-fit-cover"
            width="50"
            height="50"
          />`,
      `${product.first_name} ${product.last_name}`,
      product.age,
      product.email,
    ];

    tds.forEach((td, index) => {
      tr.children[index].innerHTML = td;
    });
  };

  const appendProduct = (product) => {
    let tr = document.createElement("tr");
    tr.id = `product-${product.id}`;

    let tds = [
      product.id,
      `<img
            src="${product.image}"
            alt=""
            class="rounded-circle object-fit-cover"
            width="50"
            height="50"
          />`,
      `${product.first_name}: ${product.last_name}`,
      product.age,
      product.email,
      product.password,
    ];

    tds.forEach((td) => {
      let tdElement = document.createElement("td");
      tdElement.classList.add("align-middle");
      tdElement.innerHTML = td;
      tr.append(tdElement);
    });

    let actionsTd = document.createElement("td");
    let changePasswordBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    actionsTd.classList.add("align-middle");

    editBtn.classList.add("btn", "btn-success", "btn-sm");
    editBtn.innerHTML =
      '<span class="material-icons-outlined fs-5"> edit </span>';
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
    deleteBtn.innerHTML =
      '<span class="material-icons-outlined fs-5"> delete </span>';

    actionsTd.append(editBtn, deleteBtn);

    tr.append(actionsTd);

    tbody.append(tr);

    deleteBtn.addEventListener("click", async () => {
      tr.remove();

      await axios.delete(`/products/${product.id}`);
    });

    editBtn.addEventListener("click", () => {
      let form = document.querySelector("#edit-user-form");
      new bootstrap.Modal("#edit-user-modal").show();

      form.querySelector("#edit-first-name").value = product.first_name;
      form.querySelector("#edit-last-name").value = product.last_name;
      form.querySelector("#edit-age").value = product.age;
      form.querySelector("#edit-email").value = product.email;
      form.querySelector("#edit-image").value = product.image;

      document
        .querySelector("#edit-user-btn")
        .addEventListener("click", async () => {
          let first_name = form[0].value;
          let last_name = form[1].value;
          let age = +form[2].value;
          let email = form[3].value;
          let image = form[4].value;

          let newProductInfo = {
            first_name,
            last_name,
            age,
            email,
            password: product.password,
            image,
          };

          let { data } = await axios.put(
            `/products/${product.id}`,
            newProductInfo
          );

          updateProduct(data);

          editProductModalInstance.hide();
        });
    });
  };

  let products = await axios.get("/products");

  products.data.forEach(appendProduct);

  let createProductBtn = document.querySelector("#create-user-btn");

  async function createProduct() {
    let form = document.querySelector("#create-user-form");

    let first_name = form[0].value;
    let last_name = form[1].value;
    let age = +form[2].value;
    let email = form[3].value;
    let password = form[4].value;
    let image = form[5].value;

    let newProduct = {
      first_name,
      last_name,
      age,
      email,
      password,
      image,
    };

    let res = await axios.post("/products", newProduct);

    form.reset();

    createProductModalInstance.hide();

    appendProduct(res.data);
  }

  createProductBtn.addEventListener("click", createProduct);
});
