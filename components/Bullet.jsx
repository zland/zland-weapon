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
var PureRenderMixin = React.addons.PureRenderMixin;
var WeaponActionCreators = require('weapon/actions/WeaponActionCreators');

module.exports = React.createClass({

  mixins: [PureRenderMixin],

  componentDidMount: function() {
    var el = React.findDOMNode(this.refs.bullet);
    this.$el = $(el);

    var distance = 0;
    this.intervalId = setInterval((function() {
      this.$el.translate3d({
        x: parseInt(this.props.xunits.toFixed(5)),
        y: parseInt(this.props.yunits.toFixed(5))
      });
      // Events.fireEvent('bullet.positionChanged', [this]);
      distance += this.props.distanceSteps;
      var rect = el.getBoundingClientRect();
      WeaponActionCreators.bulletFlight(this.props.id, distance, {x: rect.left, y: rect.top});
    }).bind(this), 33);
  },

  componentWillUnmount: function() {
    clearInterval(this.intervalId);
  },

  render: function() {
    return (
      <div className="bullet" ref="bullet"></div>
    );
  }
})
