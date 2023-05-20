import React from 'react';

const useDelay = (callback, deps, timeout = 1000) => {
    const timeoutId = React.useRef();

    React.useEffect(() => {
        clearTimeout(timeoutId.current);
        timeoutId.current = window.setTimeout(callback, timeout);

        return () => clearTimeout(timeoutId.current);
    }, deps);
}

export default useDelay;