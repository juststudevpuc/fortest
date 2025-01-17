   // Initialize products array from localStorage or empty if none exists
   let products = JSON.parse(localStorage.getItem('products')) || [];
   let editIndex = -1; // Keeps track of which product is being edited
   
   // Get references to DOM elements
   const productTableBody = document.getElementById('productTableBody');
   const productForm = document.getElementById('productForm');
   const productModalLabel = document.getElementById('productModalLabel');
   const productName = document.getElementById('productName');
   const productCategory = document.getElementById('productCategory');
   const productPrice = document.getElementById('productPrice');
   const productStock = document.getElementById('productStock');
   
   // Function to display all products in the table
   function renderProducts() {
       productTableBody.innerHTML = ''; // Clear table content
   
       // Loop through the products and add rows to the table
       for (let i = 0; i < products.length; i++) {
           const product = products[i];
           const row = `
               <tr>
                   <td>${i + 1}</td>
                   <td>${product.name}</td>
                   <td>${product.category}</td>
                   <td style="color: red;">$${product.price.toFixed(2)}</td>
                   <td>${product.stock}</td>
                   <td>
                       <button class="btn btn-primary btn-sm" onclick="editProduct(${i})" data-bs-toggle="modal" data-bs-target="#productModal">Edit</button>
                       <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
                   </td>
               </tr>
           `;
           productTableBody.innerHTML += row; // Add row to table
       }
   }
   
   // Function to reset the form inputs and state
   function resetForm() {
       productForm.reset(); // Clear the form
       editIndex = -1; // Reset the edit index
       productModalLabel.textContent = 'Add Product'; // Set modal title
   }
   
   // Handle form submission to add or edit a product
   productForm.addEventListener('submit', function (e) {
       e.preventDefault(); // Stop page reload
   
       // Create a new product object from form inputs
       const newProduct = {
           name: productName.value,
           category: productCategory.value,
           price: parseFloat(productPrice.value),
           stock: parseInt(productStock.value),
       };
   
       if (editIndex === -1) {
           // Add new product to the array
           products.push(newProduct);
       } else {
           // Update the existing product
           products[editIndex] = newProduct;
       }
   
       // Save products array to localStorage
       localStorage.setItem('products', JSON.stringify(products));
   
       // Refresh the table and reset the form
       renderProducts();
       resetForm();
   
       // Close the modal
       const modal = document.getElementById('productModal');
       const modalInstance = bootstrap.Modal.getInstance(modal);
       modalInstance.hide();
   });
   
   // Function to fill the form for editing a product
   function editProduct(index) {
       editIndex = index; // Set the index of the product to be edited
       const product = products[index]; // Get the product data
       productName.value = product.name;
       productCategory.value = product.category;
       productPrice.value = product.price;
       productStock.value = product.stock;
       productModalLabel.textContent = 'Edit Product'; // Update modal title
   }
   
   // Function to delete a product
   function deleteProduct(index) {
       const confirmDelete = confirm('Are you sure you want to delete this product?');
       if (confirmDelete) {
           products.splice(index, 1); // Remove product from the array
           localStorage.setItem('products', JSON.stringify(products)); // Save changes to localStorage
           renderProducts(); // Refresh the table
       }
   }
   
   // Display products when the page loads
   renderProducts();
   