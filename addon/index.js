export function metaToHeadTags(meta) {
  let metaTypes = Object.keys(meta);
  return metaTypes.reduce(function (headTags, meta_type) {
    headTags.push(
      ...Object.keys(meta[meta_type]).map(function (key) {
        return {
          tagId: `${meta_type}:${key}`,
          type: 'meta',
          attrs: {
            [meta_type]: key,
            content: meta[meta_type][key],
          },
        };
      })
    );
    return headTags;
  }, []);
}
