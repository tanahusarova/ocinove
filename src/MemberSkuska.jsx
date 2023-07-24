import React, { Component } from 'react';
import $ from 'jquery';

class MemberSkuska extends Component {
  componentDidMount() {
    // Initialize the draggable parent
    $('.parent').draggable({
      containment: 'body',
      drag: (event, ui) => {
        const { top, left } = ui.position;
        // Update child position relative to the parent
        $('.child').css({
          top: `-=${top}px`,
          left: `-=${left}px`
        });
      },
      stop: () => {
        // Handle stop event if needed
      }
    });

    // Initialize the draggable child
    $('.child').draggable({
      containment: '.parent',
      drag: () => {
        // Handle drag event if needed
      },
      stop: () => {
        // Handle stop event if needed
      }
    });
  }

  render() {
    return (
      <div>
        <div className="parent">
          <div className="child"></div>
        </div>
      </div>
    );
  }
}

export default MemberSkuska;
