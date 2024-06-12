// Step 1: Research component
function Research() {
    return (
        <div>
            <h2>Restaurant Search</h2>
            <input type="text" placeholder="Search for restaurants..." />
            <h2>Filters</h2>
            <label>Cuisine Type:</label>
            <select>
                <option value="all">All</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="chinese">Chinese</option>
                {/* Add more cuisine types as needed */}
            </select>
            <label>Location:</label>
            <input type="text" placeholder="Enter location..." />
            <label>Price Range:</label>
            <select>
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                {/* Add more price range options as needed */}
            </select>
            {/* Restaurant list or grid */}
            <h2>Restaurant Details</h2>
            {/* Individual restaurant details component */}
            <div>
                <h3>Restaurant Name</h3>
                {/* Restaurant details like menu, reviews, photos, and map */}
                <p>Menu: Lorem ipsum dolor sit amet...</p>
                <p>Reviews: Lorem ipsum dolor sit amet...</p>
                <img src="restaurant-photo.jpg" alt="Restaurant" />
                {/* Embedded Google Maps or similar for location */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7880957184495!2d-1.6161607846697863!3d53.80401828320544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b418ae4dcaf25%3A0x3c6c41dc07e50928!2sManchester%20Central%20Convention%20Complex!5e0!3m2!1sen!2suk!4v1621289633522!5m2!1sen!2suk" width="400" height="300" style={{ border: 0 }} allowfullscreen="" loading="lazy"></iframe>
            </div>
            {/* Add pagination or infinite scroll for multiple restaurants */}
        </div>
    );
}

// Render the Research component into the 'research' container
ReactDOM.render(
    <Research />,
    document.getElementById('restik_research')
);
