// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

const EventHelper = {
  cancel: (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    
    return false;
  },
  
  getCurrentElement: (event: any) => {
    return (event as any).currentTarget;
  },
  getOriginalElement: (event: any) => {
    return event.srcElement || (event as any).originalTarget || event.target;
  },
  getMousePosition: (event: any) => {
    return [(event as any).clientX, (event as any).clientY];
  }
};

export {EventHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.
