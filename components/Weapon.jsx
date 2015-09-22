/*!
 * Copyright 2015 Florian Biewald
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

require('weapon/sass/style');

var React = require('react');
var PureRenderMixin = React.addons.PureRenderMixin;
var Bullet = require('./Bullet');
var PlayerStore = require('player/stores/PlayerStore');

module.exports = React.createClass({

  mixins: [PureRenderMixin],

  getStoreValues: function() {
    return {
      weapon: PlayerStore.getWeapon()
    };
  },

  getInitialState: function() {
    return this.getStoreValues();
  },

  _onChange: function() {
    this.setState(this.getStoreValues());
  },

  componentDidMount: function() {
    PlayerStore.addChangeListener(this._onChange);
    this.$el = $(React.findDOMNode(this.refs.weapon));
  },

  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  render: function() {
    console.log("--- weapon render");
    return (
      <div className="weapon" ref="weapon">
        {this.state.weapon.bullets.map(function(bullet) {
          return <Bullet {...bullet} key={bullet.id}/>
        })}
      </div>
    );
  }
})
