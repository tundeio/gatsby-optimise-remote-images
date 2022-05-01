// gatsby-node,js
const { createRemoteFileNode } = require("gatsby-source-filesystem") // We'll use this to create the file nodes from the remote images
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // creates a relationship between GhostPost and the File node for the optimized image
  createTypes(`
    type GhostPost implements Node {
      remote_image: File @link
    }
  `) // change "GhostPost" to whatever type you're using from your source plugin
}
exports.onCreateNode = async ({
  actions: { createNode },
  getCache,
  createNodeId,
  node,
}) => {
  // we need to verify that we're using the correct node created by our source plugin so we check its type and if it has a value
  if (node.internal.type === `GhostPost` && node.feature_image !== null) {
    // create the file node
    const fileNode = await createRemoteFileNode({
      url: node.feature_image, // URL of the remote image
      getCache, // Gatsby cache
      createNode, // helper function to generate the node
      createNodeId, // helper function to generate the node ID
      parentNodeId: node.id, // id of the parent node of the file
      node,
    })
    // if the file node was created, attach the new node
    if (fileNode) {
      node.remote_image = fileNode.id
    }
  }
}
