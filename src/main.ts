import 'disposablestack/auto';

function doNothing() {
  console.log('Nothing happens.');
}

function detectClickEvents() {
  const abortController = new AbortController();
  window.addEventListener(
    'click',
    ({ clientX }) => {
      console.log({ clientX });
    },
    {
      signal: abortController.signal,
    }
  );
  return {
    [(Symbol as any).dispose]() {
      console.log('click event listener disposed.')
      abortController.abort();
    },
  };
}

function detectResizeEvents() {
  const abortController = new AbortController();
  window.addEventListener(
    'resize',
    () => {
      console.log({
        size: `${window.innerWidth}x${window.innerHeight}`,
      });
    },
    { signal: abortController.signal }
  );
  return {
    [(Symbol as any).dispose]() {
      console.log('resize event listener disposed.')
      abortController.abort();
    },
  };
}

const map = {
  nothing: doNothing,
  click: detectClickEvents,
  resize: detectResizeEvents,
} satisfies Record<string, () => void>;

function isKey(str: string): str is keyof typeof map {
  return Object.keys(map).includes(str);
}

function* effect() {
  while (true) {
    const { hash } = location;
    const key = hash.slice(1);
    using dispose = isKey(key) && map[key]();
    yield;
  }
}

function main() {
  const eff = effect();
  window.addEventListener('hashchange', function () {
    eff.next();
  });
}

main();
