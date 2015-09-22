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

var React = require('react');
// var PureRenderMixin = React.addons.PureRenderMixin;
var WeaponActionCreators = require('weapon/actions/WeaponActionCreators');
var MapStore = require('map/stores/MapStore');
var PlayerStore = require('player/stores/PlayerStore');


module.exports = React.createClass({

  // mixins: [PureRenderMixin],

  intervalId: null,

  bulletId: null,

  mounted: false,

  getStoreValues: function() {
    return {
      heading: MapStore.getMapHeading(),
      bullet: PlayerStore.getBulletById(this.bulletId)
    };
  },

  getInitialState: function() {
    return this.getStoreValues();
  },

  _onChange: function() {

    if (this.mounted) {
      this.setState(this.getStoreValues());
    }
  },

  componentDidMount: function() {
    this.mounted = true;
    PlayerStore.addChangeListener(this._onChange);
    MapStore.addChangeListener(this._onChange);

    this.initialHeading = this.state.heading;
    var el = React.findDOMNode(this.refs.bullet);

    this.$el = $(el);
    this.$img = this.$el.find('img');
    var img = this.$img.get(0);

    var distance = 0;
    this.intervalId = setInterval((function() {
      this.$img.translate3d({
        x: parseInt(this.state.bullet.get('xunits').toFixed(5)),
        y: parseInt(this.state.bullet.get('yunits').toFixed(5))
      });
      // Events.fireEvent('bullet.positionChanged', [this]);
      distance += this.state.bullet.get('distanceSteps');
      var rect = img.getBoundingClientRect();
      WeaponActionCreators.bulletFlight(this.state.bullet.get('id'), distance, {x: rect.left, y: rect.top});
    }).bind(this), 33);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    this.$img.translate3d({rotate: nextState.bullet.get('rotation')});
    if (nextState.heading !== this.state.heading) {
      var heading = this.initialHeading - nextState.heading;
      this.$el.translate3d({rotate: heading * -1});
    }

    // @todo: find a solution for this
    // if (nextProps.moveDiffX !== 0 || nextProps.moveDiffY !== 0) {
    //   this.$img.translate3d({x: nextProps.moveDiffX * -1, y: nextProps.moveDiffY * -1});
    // }
    return false;
  },

  componentWillMount: function() {
    console.log("will mount");
    this.bulletId = this.props.id;
    this.setState(this.getStoreValues());
  },

  componentWillUnmount: function() {
    this.mounted = false;
    clearInterval(this.intervalId);
    PlayerStore.removeChangeListener(this._onChange);
    MapStore.removeChangeListener(this._onChange);
  },

  render: function() {
    console.log("--- knife bullet render");
    return (
      <div className="bullet-wrapper" ref="bullet">
        <img className="knife" src="assets/zland-weapon/img/knife.png"/>
      </div>
    );
  }
});
