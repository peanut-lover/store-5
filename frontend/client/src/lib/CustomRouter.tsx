import React, { useCallback, useMemo, useEffect, useState, useContext, createContext } from 'react';

interface RouterContextType {
  location: string;
  push: (location: string) => void;
}

/**
 * Routing을 위한 location 상태와 상태 업데이트 함수(Push)를 관리하는 Context
 */
const RouterContext = createContext<RouterContextType>({
  location: '',
  push: (location: string) => {},
});

/**
 * Routing Context로 감싸주는 Component
 */
export const Router: React.FC = ({ children }) => {
  const [location, setLocation] = useState(window.location.pathname);

  const handlePush = useCallback((newLocation) => {
    window.history.pushState({}, '', newLocation);
    setLocation(newLocation);
  }, []);

  const handleHashChange = useCallback(() => {
    setLocation(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, [handleHashChange]);

  const value = useMemo(() => {
    return { location, push: handlePush };
  }, [location, handlePush]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

interface LinkProps {
  to: string;
}

export const Link: React.FC<LinkProps> = ({ to, children }) => {
  const { push } = useContext(RouterContext);
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        push(to);
      }}
    >
      {children}
    </a>
  );
};

type Params = { [key: string]: string };

type Match = {
  route: Route;
  params: Params;
};

interface RouteProps {
  path?: string;
}

/**
 * Routing 되는 페이지하나를 나타내는 Component
 */
export class Route extends React.Component<RouteProps> {
  render() {
    return this.props.children;
  }
}

/**
 * URL Parameter와 Path를 추출하는 함수
 */
function compilePath(path: string) {
  const keys: string[] = [];

  path = path.replace(/:(\w+)/g, (_, key) => {
    keys.push(key);
    return '([^\\/]+)';
  });

  const source = `^(${path})`;

  const regex = new RegExp(source, 'i');
  return { regex, keys };
}

/**
 * location 정보를 토대로 Path Matching을 수행하고 매칭된 Route를 돌려주는 함수.
 * @param children 보여질 Routing Page들(components)
 * @param location 탐색할 경로
 */
function matchRoutes(children: Route[], location: string) {
  const matches: Match[] = [];

  React.Children.forEach(children, (route) => {
    const { regex, keys } = compilePath(route.props.path!);
    const match = location.match(regex);
    if (match) {
      const params = match.slice(2);
      matches.push({
        route: route,
        params: keys.reduce<Params>((collection, param, index) => {
          collection[param] = params[index];
          return collection;
        }, {}),
      });
    }
  });

  return matches[0];
}

type RouteContextType = {
  params: Params;
};

const RouteContext = createContext<RouteContextType>({
  params: {},
});

/**
 * RouterContext에 있는 location 정보를 이용해서 알맞은 Route Component를 보여준다.
 */
export const Routes: React.FC = ({ children }) => {
  const { location } = useContext(RouterContext);

  const match: Match = useMemo(() => matchRoutes(children as Route[], location), [children, location]);
  const value = useMemo(() => {
    return { params: match.params };
  }, [match]);

  if (!match) {
    return null;
  }

  return <RouteContext.Provider value={value}>{match.route}</RouteContext.Provider>;
};

/**
 * Routing에 사용된 URL에서 Parameter 정보를 추출한다.
 */
export function useParams() {
  return useContext(RouteContext).params;
}
