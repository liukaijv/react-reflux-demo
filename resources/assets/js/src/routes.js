import React from 'react';
import {Route,Redirect} from 'react-router';

//components
import App from './components/app';
import Dashboard from './pages/dashboard';

//category
import Category from './pages/category';
import CategoryIndex from './components/category/index';
import CategoryCreate from './components/category/create';
import CategoryEdit from './components/category/edit';

//post
import Post from './pages/post';
import PostIndex from './components/post/index';
import PostCreate from './components/post/create';
import PostEdit from './components/post/edit';

//tag
import Tag from './pages/tag';
import TagIndex from './components/tag/index';
import TagCreate from './components/tag/create';
import TagEdit from './components/tag/edit';

export default (		
		<Route>
			<Redirect from="/" to="index"/>	
			<Route path="/" component={App}>					
				<Route path="index" component={Dashboard} />				
				<Route path="category" component={Category}>	
					<Route path="index" component={CategoryIndex} />
					<Route path="create" component={CategoryCreate} />
					<Route path="edit/:id" component={CategoryEdit} />
				</Route>
				<Route path="post" component={Post}>	
					<Route path="index" component={PostIndex} />
					<Route path="create" component={PostCreate} />
					<Route path="edit/:id" component={PostEdit} />
				</Route>
				<Route path="tag" component={Tag}>	
					<Route path="index" component={TagIndex} />
					<Route path="create" component={TagCreate} />
					<Route path="edit/:id" component={TagEdit} />
				</Route>					
			</Route>			
		</Route>

	)