import React from "react";
import { Row, Col, Card, Spinner, Table, Alert, Image } from 'react-bootstrap';
import './App.css';


class App extends React.Component {
	constructor() {
		super();
		this.state = {isLoading: true, data: {}, error_msg: null};
	}
	async componentDidMount(){
		try {
			let url = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';
			const res = await fetch(url);
        	const data = await res.json();
			this.setState({
				data: data.feed, 
				isLoading: false
			});
			if(data.feed.icon && data.feed.icon.label){
				const favicon = document.getElementById("favicon");
        		favicon.href = data.feed.icon.label; 
			}
			if(data.feed.title && data.feed.title.label){
				document.title = data.feed.title.label;
			}
		} catch(e) {
			let error_msg = "Something went wrong";
			this.setState({
				error_msg: error_msg, isLoading: false
			});
		}
	}	
    render(){
      	return(			  
			<React.Fragment>
				<Row className="mt-5">
					<Col lg={{span: 10, offset: 1}}>	
						<Card className="ml-1 mr-1">
							<Card.Header>
								{this.state.data && this.state.data.title ? this.state.data.title.label: "iTunes Store"}
								<span className="align_right">{this.state.data && this.state.data.rights ? this.state.data.rights.label: null}</span>
							</Card.Header>
							<Card.Body>
								{this.state.error_msg?<Alert variant="danger">{this.state.error_msg}</Alert>:<React.Fragment>
									{this.state.isLoading?
										<Spinner animation="border" variant="info"/>
									:
										<div className="mt-3">
											{this.state.data.entry?
												<Table responsive>
													<thead>
												  		<tr>
															<th>Name</th>
															<th>Image</th>
															<th>Count</th>
															<th>Price</th>
															<th>Cotent Type</th>
															<th>Rights</th>
															<th>Title</th>
															<th>Artist</th>
															<th>Category</th>
															<th>Release Date</th>
												  		</tr>
													</thead>
													<tbody>
														{this.state.data.entry.map((item, ind)=>{
															return (
																<tr key={item["id"]["label"]}>
																	<td><a href={item["link"]["attributes"]["href"]}>{item["im:name"]["label"]}</a></td>
																	<td><Image src={item["im:image"][0]["label"]} roundedCircle /></td>
																	<td>{item["im:itemCount"]["label"]}</td>
																	<td>{item["im:price"]["label"]}</td>
																	<td>{item["im:contentType"]["im:contentType"]["attributes"]["label"]}</td>
																	<td>{item["rights"]["label"]}</td>
																	<td>{item["title"]["label"]}</td>																	
																	<td>{item["im:artist"]["label"]}</td>
																	<td>{item["category"]["attributes"]["label"]}</td>
																	<td>{item["im:releaseDate"]["attributes"]["label"]}</td>
																</tr>
															)
														})};												  		
													</tbody>
											  	</Table>:null
											}							
										</div>
										}
									</React.Fragment>
								}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</React.Fragment>
  		);
    }
}

export default App;
