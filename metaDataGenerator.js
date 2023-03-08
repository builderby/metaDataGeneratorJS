const fs = require("fs");
const prompt = require("prompt-sync")();
const Jimp = require("jimp");
const emoji = require("node-emoji");

async function createJsonFiles(
  numFiles,
  collectionName,
  collectionSymbol,
  collectionDescription,
  royaltiesPercentage,
  imageFile,
  traits,
  creators,
  externalUrl
) {
  if (!fs.existsSync("images")) {
    fs.mkdirSync("images");
  }

  if (!fs.existsSync("json_files")) {
    fs.mkdirSync("json_files");
  }

  const failedFiles = [];

  for (let i = 0; i < numFiles; i++) {
    const fileName = `${i}.png`;

    try {
      const img = await Jimp.read(imageFile);
      await img.writeAsync(`images/${fileName}`);
    } catch (e) {
      console.log(`${emoji.get("x")} Error creating image ${fileName}: ${e}`);
      failedFiles.push(i);
      continue;
    }

    const data = {
      name: `${collectionName} #${i}`,
      symbol: collectionSymbol,
      description: collectionDescription,
      seller_fee_basis_points: parseInt(royaltiesPercentage * 100),
      image: `${fileName}`,
      external_url: externalUrl,
      attributes: traits,
      properties: {
        files: [
          {
            uri: `${fileName}`,
            type: "image/png",
          },
        ],
        category: "image",
        creators: creators,
      },
    };

    try {
      fs.writeFileSync(`json_files/${i}.json`, JSON.stringify(data, null, 4));
      console.log(
        `${emoji.get("white_check_mark")} ${i}.json created successfully`
      );
    } catch (e) {
      console.log(`${emoji.get("x")} Error creating JSON file ${i}.json: ${e}`);
      failedFiles.push(i);
    }
  }

  if (failedFiles.length > 0) {
    console.log(
      `${emoji.get("hourglass_flowing_sand")} Retrying ${
        failedFiles.length
      } failed files...`
    );
    for (let i of failedFiles) {
      const fileName = `${i}.png`;
      const data = {
        name: `${collectionName} #${i}`,
        symbol: collectionSymbol,
        description: collectionDescription,
        seller_fee_basis_points: parseInt(royaltiesPercentage * 100),
        image: `${fileName}`,
        external_url: externalUrl,
        attributes: traits,
        properties: {
          files: [
            {
              uri: `${fileName}`,
              type: "image/png",
            },
          ],
          category: "image",
          creators: creators,
        },
      };
      try {
        fs.writeFileSync(`json_files/${i}.json`, JSON.stringify(data, null, 4));
        console.log(
          `${emoji.get("white_check_mark")} ${i}.json created successfully`
        );
      } catch (e) {
        console.log(
          `${emoji.get("x")} Error creating JSON file ${i}.json: ${e}`
        );
      }
    }
  }

  console.log(`${emoji.get("rocket")} All files created successfully!`);
  process.exit();
}

try {
  const numFiles = parseInt(prompt("Enter the collection size: "));
  const collectionName = prompt("Enter collection name: ");
  const collectionSymbol = prompt("Enter collection symbol: ");
  const collectionDescription = prompt("Enter collection description: ");
  const royaltiesPercentage =
    parseFloat(prompt("Enter the percentage of royalties (1-10): ")) / 1;
  const imageFile = prompt("Enter the location of the image file: ");
  const externalUrl = prompt("Enter an external URL (optional): ");
  // get traits
  const numTraits = parseInt(prompt("Enter the number of traits: "));
  const traits = [];
  for (let i = 0; i < numTraits; i++) {
    const traitType = prompt(`Trait ${i + 1} type: `);
    const value = prompt(`Trait ${i + 1} value: `);
    traits.push({
      trait_type: traitType,
      value: value,
    });
  }

  const creators = [];
  const numCreators = parseInt(prompt("Enter the number of creators: "));
  for (let i = 0; i < numCreators; i++) {
    const creatorAddress = prompt(`Enter the address of creator ${i + 1}: `);
    const creatorShare = parseInt(
      prompt(`Enter the percentage of royalties for creator ${i + 1}: `)
    );
    creators.push({
      address: creatorAddress,
      share: creatorShare,
    });
  }

  createJsonFiles(
    numFiles,
    collectionName,
    collectionSymbol,
    collectionDescription,
    royaltiesPercentage,
    imageFile,
    traits,
    creators,
    externalUrl
  );
} catch (e) {
  console.log(`${emoji.get("x")} Error: ${e}. Please try again later.`);
}
