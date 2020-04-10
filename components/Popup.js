
import Head from 'next/head';

//const Popup = ({ children, closePopup, showPop, title }) => {
	//if (!showPop) {
		//return null;
	//}

	//return (
		//<div class="modal is-active">
			//<div class="modal-background" onClick={closePopup} />
			//<div class="modal-content">
				//<div class="content">
					//{children}
				//</div>
			//</div>
		//</div>
	//);
//}

class Popup extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		if (!this.props.showPop)
			return null;


		return (
			<div class="modal is-active">
				<div class="modal-background" onClick={this.props.closePopup} />
					<div class="modal-card animated bounceIn fast">
						<header class="modal-card-head">
							<p class="modal-card-title">{this.props.title}</p>
							<button class="delete" onClick={this.props.closePopup} />
						</header>
						<section class="modal-card-body">
							<div class="content">
								{this.props.children}
							</div>
						</section>
						<footer class="modal-card-foot">
							<div class="buttons is-right">
								<button onClick={this.props.btnFunc} class="button is-primary">{this.props.submitText}</button>
							</div>
						</footer>
					</div>
			</div>
		);
	}
}

export default Popup;

