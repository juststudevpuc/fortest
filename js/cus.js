    // Initialize customers array from localStorage or empty if none exists
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    let editCustomerIndex = -1; // Keeps track of which customer is being edited
    
    // Get references to DOM elements
    const customerTableBody = document.getElementById('customerTableBody');
    const customerForm = document.getElementById('customerForm');
    const customerModalLabel = document.getElementById('customerModalLabel');
    const customerName = document.getElementById('customerName');
    const customerGender = document.getElementById('customerGender');
    const customerPhone = document.getElementById('customerPhone');
    const customerAddress = document.getElementById('customerAddress');
    
    // Function to display all customers in the table
    function renderCustomers() {
        customerTableBody.innerHTML = ''; // Clear table content
    
        // Loop through the customers and add rows to the table
        for (let i = 0; i < customers.length; i++) {
            const customer = customers[i];
            const row = `
                <tr>
                    <td>${i + 1}</td>
                    <td>${customer.name}</td>
                    <td>${customer.gender}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editCustomer(${i})" data-bs-toggle="modal" data-bs-target="#customerModal">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${i})">Delete</button>
                    </td>
                </tr>
            `;
            customerTableBody.innerHTML += row; // Add row to table
        }
    }
    
    // Function to reset the form inputs and state
    function resetForm() {
        customerForm.reset(); // Clear the form
        editCustomerIndex = -1; // Reset the edit index
        customerModalLabel.textContent = 'Add Customer'; // Set modal title
    }
    
    // Handle form submission to add or edit a customer
    customerForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop page reload
    
        // Create a new customer object from form inputs
        const newCustomer = {
            name: customerName.value,
            gender: customerGender.value,
            phone: customerPhone.value,
            address: customerAddress.value,
        };
    
        if (editCustomerIndex === -1) {
            // Add new customer to the array
            customers.push(newCustomer);
        } else {
            // Update the existing customer
            customers[editCustomerIndex] = newCustomer;
        }
    
        // Save customers array to localStorage
        localStorage.setItem('customers', JSON.stringify(customers));
    
        // Refresh the table and reset the form
        renderCustomers();
        resetForm();
    
        // Close the modal
        const modal = document.getElementById('customerModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    });
    
    // Function to fill the form for editing a customer
    function editCustomer(index) {
        editCustomerIndex = index; // Set the index of the customer to be edited
        const customer = customers[index]; // Get the customer data
        customerName.value = customer.name;
        customerGender.value = customer.gender;
        customerPhone.value = customer.phone;
        customerAddress.value = customer.address;
        customerModalLabel.textContent = 'Edit Customer'; // Update modal title
    }
    
    // Function to delete a customer
    function deleteCustomer(index) {
        const confirmDelete = confirm('Are you sure you want to delete this customer?');
        if (confirmDelete) {
            customers.splice(index, 1); // Remove customer from the array
            localStorage.setItem('customers', JSON.stringify(customers)); // Save changes to localStorage
            renderCustomers(); // Refresh the table
        }
    }
    
    // Display customers when the page loads
    renderCustomers();
    