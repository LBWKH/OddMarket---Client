import React from 'react';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
//const stripePromise = loadStripe('pk_test_51ISkjZJFBujY6d33pWEP9iMW8rwWp0R1tIPvoHsioySZzUYDh7xpthK17aAQe0ZO2bGM7Y0pwLOxBh0xJdT0PdGo00Ei8LgRwY');

export default function Cart() {
	return (
		<div className='d-flex flex-column'>
			<h1>
				<strong>My Cart</strong>
			</h1>
			<p>5 items</p>
			<div className='d-flex justify-content-between'>
				<CartItem />
				<div className='card col-lg-4' style={{ width: '18rem;' }}>
					<div className='card-body'>
						<h5 className='card-title'>
							<strong>Order summary</strong>
						</h5>
						{/* <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6> */}
						<p className='card-text'>Subtotal:</p>
						<p className='card-text'>Taxes:</p>
						<p className='card-text'>Total price:</p>
						<Link type='button' className='btn btn-primary' to='/checkout'>
							Checkout
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
