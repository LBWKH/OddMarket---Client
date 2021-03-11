import { useEffect, useState, useContext } from 'react';
import React from 'react';
import api from '../apis/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { CartContext } from '../contexts/cartContext';

export default function SucessPurchase(props) {
	const authContext = useContext(AuthContext);
	console.log(authContext);

	const cartContext = useContext(CartContext);
	console.log(cartContext);

	const [stripeResponse, setStripeResponse] = useState('');

	// useEffect(() => {
	// 	localStorage.removeItem('cart');
	// });

	// let test = localStorage.getItem('cart')
	// console.log(test.JSON.parse)

	useEffect(() => {
		async function fetchResponse() {
			try {
				const response = await api.post(
					`/order/success/${props.match.params.id}`
				);
				setStripeResponse({ ...response });
			} catch (err) {
				console.log(err);
			}
		}
		fetchResponse();
	}, []);

	async function sendTransaction() {
		try {
			const response = await api.post(`http://localhost:1234/transaction`, {
				value: stripeResponse.data.checkout.amount_total,
				products: ['60496332d20793ec16744061'],
				ownerId: authContext.loggedInUser.user._id,
				checkoutId: props.match.params.id,
			});
		} catch (err) {
			console.log(err);
		}
	}

	// if (stripeResponse) {
	// 	console.log(stripeResponse.data.items.data);
	// }

	return (
		<div>
			<div className='card text-center'>
				<div className='card-header'>
					Order Received #
					{stripeResponse
						? stripeResponse.data.checkout.payment_intent.slice(21)
						: ''}
				</div>
				<div className='card-body'>
					<h1></h1>
					<h5 className='card-title'>
						{authContext.loggedInUser.user.name}, you completed all steps!
					</h5>
					<p>
						<strong>
							Total order: R$
							{stripeResponse
								? stripeResponse.data.checkout.amount_total.toFixed(2)
								: ''}
						</strong>
					</p>
					<ul className='list-group list-group-flush'>
						{stripeResponse
							? stripeResponse.data.items.data.map((element) => {
									return (
										<li className='list-group-item'>
											<p class='mb-1'>
												{element.description.replace(/-/g, ' ')}
											</p>
											<p class='mb-1'>Quantity: {element.quantity}</p>
											<p class='mb-1'>
												Subtotal: R${element.amount_subtotal.toFixed(2)}
											</p>
										</li>
									);
							  })
							: ''}
					</ul>
					<p className='card-text'>
						You will receive an order confirmation with details of your order
						and a link to track its progress.
					</p>
					<Link to='/catalog' className='btn btn-primary'>
						Go back to the catalog
					</Link>
				</div>
				<div className='card-footer text-muted'></div>
			</div>
		</div>
	);
}
