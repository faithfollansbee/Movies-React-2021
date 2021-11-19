// import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import RecipeForm from './RecipeForm'
// import { withRouter } from 'react-router-dom'
// class AddRecipe extends Component {
//   state = {
//     // recipe: this.props,
//     recipe: {
//       name: '',
//       steps: ''
//     },
//     submitted: false
//   }
//   // async componentDidMount (props) {
//   //   try {
//   //     const response = await axios({
//   //       url: `${apiUrl}/recipes/${this.props.match.params.id}`,
//   //       method: 'GET',
//   //       headers: {
//   //         'Authorization': `Token token=${this.props.user.token}`
//   //       }
//   //     })
//   //     this.setState({
//   //       recipe: response.data.recipe
//   //     })
//   //     // this.setState = { form: { subrecipe: '' } }
//   //     // this.setState({ subrecipe: '' })
//   //     console.log(this.state.recipe)
//   //   } catch (error) {
//   //   }
//   // }
//   // onMealChange = event => this.setState({ meal: event.target.value })
//   handleChange = event => {
//     this.setState({
//       recipe: {
//         ...this.state.recipe,
//         [event.target.name]: event.target.value
//       }
//     })
//     // this.setState({
//     //   subrecipe: {
//     //     ...this.state.subrecipe,
//     //     [event.target.name]: event.target.value
//     //   }
//     // })
//   }
//   //
//   // async componentDidMount () {
//   //   try {
//   //     const response = await axios({
//   //       url: `${apiUrl}/recipes`,
//   //       method: 'GET',
//   //       headers: {
//   //         Authorization: `Token token=${this.props.user.token}`
//   //       }
//   //     })
//   //     this.setState({ recipes: response.data.recipes, isLoading: false })
//   //     this.setState({ userRecipes: response.data.recipes })
//   //   } catch (error) {
//   //   }
//   // }
//   handleSubmit = event => {
//     event.preventDefault()
//     axios({
//       method: 'POST',
//       url: `${apiUrl}/recipes`,
//       headers: {
//         'Authorization': `Token token=${this.props.user.token}`
//       },
//       data: {
//         recipe: {
//           name: this.state.recipe.name,
//           steps: this.state.recipe.steps,
//           cookbook: this.props.match.params.id,
//           owner: this.props.user._id
//         }
//       }
//     })
//       .then(response => {
//         this.props.history.push(`/cookbooks/${this.props.match.params.id}/`)
//       })
//       // .then(response => {
//       //   this.props.history.push(`/recipes/${this.state.recipe._id}`)
//       // })
//       .catch(() => {
//         this.props.alert({
//           heading: 'Failed',
//           message: 'Did not create'
//         })
//       })
//       .catch(err => this.setState({ error: err.message }))
//   }
//   render () {
//     return (
//       <MovieForm
//         movie={this.state.movie}
//         handleChange={this.handleChange}
//         handleRecipeSubmit={this.handleSubmit}
//         correctRoute={this.props.match.params.id}
//       />
//     )
//   }
// }
// export default withRouter(AddMovie)
