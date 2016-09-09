import { Base } from 'yeoman-generator';

export default class APIGenerator extends Base {
	prompting() {
		return Promise.resolve()
			.then(() => {
				if (this.options.state !== undefined) {
					return;
				}
				return this._prompt([{
					message: 'State',
					name:    'state',
					type:    'list',
					default: 'redux',
					choices: [
						{ name: 'Redux', value: 'redux' },
						{ name: 'Don\'t worry about it', value: null },
					],
				}]);
			})
			.then(() => {
				switch (this.options.state) {
					case 'redux':
						this.composeWith('full-stack:redux', { options: Object.assign({}, this.options) });
						break;
					default:
						break;
				}
			});
	}
	writing() {
		if (this.options.server) {
			this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.js'));
			this.npmInstall(
				[
					'feathers',
					'feathers-rest',
				],
				{ save: true }
			);

			this.fs.copy(this.templatePath('entities/foos/service.js'), this.destinationPath('entities/foos/service.js'));
			this.npmInstall(
				[
					'feathers-memory',
				],
				{ save: true }
			);
		}

		if (this.options.web) {
			if (!this.options.server && this.options.render !== 'server') {
				this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.stub.js'));
			}

			this.fs.copy(this.templatePath('api/index.web.js'), this.destinationPath('api/index.web.js'));
			this.npmInstall(
				[
					'feathers',
					'feathers-rest',
				],
				{ saveDev: true }
			);
		}
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
