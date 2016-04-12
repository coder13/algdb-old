const app = require('ampersand-app');
var React = require('react');

let roles = {
	User: (<span style={{color: 'gray'}}>User</span>),
	Moderator: (<span style={{color: 'blue'}}>Moderator</span>),
	Admin: (<span style={{color: 'purple'}}>Admin</span>)
};

const User = function (user, index) {
	let email = <span style={{fontWeight: 'bold'}}>{user.email}</span>;
	let role = roles[user.role];
	let wcaID = <span><a href={`https://worldcubeassociation.org${user.profile.url}`}>{user.profile.wca_id}</a></span>;

	return (<p key={index}>- {email} {role} {wcaID}</p>);
};

module.exports = React.createClass({
	displayName: 'UsersPage',

	componentDidMount () {
	},

	getDefaultProps () {
		return {
			users: []
		};
	},

	render () {
		return (
			<div className='container' style={{padding: '50px'}}>
				{this.props.users.map(User)}
			</div>
		);
	}
});
