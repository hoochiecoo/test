// Step 1: Research component
function Research() {
    return React.createElement('div', null,
        React.createElement('h2', null, 'Restaurant Search'),
        React.createElement('input', { type: 'text', placeholder: 'Search for restaurants...' }),
        React.createElement('h2', null, 'Filters'),
        React.createElement('label', null, 'Cuisine Type:'),
        React.createElement('select', null,
            React.createElement('option', { value: 'all' }, 'All'),
            React.createElement('option', { value: 'italian' }, 'Italian'),
            React.createElement('option', { value: 'mexican' }, 'Mexican'),
            React.createElement('option', { value: 'chinese' }, 'Chinese')
        ),
        React.createElement('label', null, 'Location:'),
        React.createElement('input', { type: 'text', placeholder: 'Enter location...' }),
        React.createElement('label', null, 'Price Range:'),
        React.createElement('select', null,
            React.createElement('option', { value: 'all' }, 'All'),
            React.createElement('option', { value: 'low' }, 'Low'),
            React.createElement('option', { value: 'medium' }, 'Medium'),
            React.createElement('option', { value: 'high' }, 'High')
        ),
        React.createElement('h2', null, 'Restaurant Details'),
        React.createElement('div', null,
            React.createElement('h3', null, 'Restaurant Name'),
            React.createElement('p', null, 'Menu: Lorem ipsum dolor sit amet...'),
            React.createElement('p', null, 'Reviews: Lorem ipsum dolor sit amet...'),
            React.createElement('img', { src: 'restaurant-photo.jpg', alt: 'Restaurant' }),
            React.createElement('iframe', { src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7880957184495!2d-1.6161607846697863!3d53.80401828320544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b418ae4dcaf25%3A0x3c6c41dc07e50928!2sManchester%20Central%20Convention%20Complex!5e0!3m2!1sen!2suk!4v1621289633522!5m2!1sen!2suk', width: '400', height: '300', style: { border: '0' }, allowfullscreen: '', loading: 'lazy' })
        )
    );
}

// Render the Research component into the 'research' container
ReactDOM.render(
    React.createElement(Research),
    document.getElementById('restik_research')
);
