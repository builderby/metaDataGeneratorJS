# Metadata Generator

This script generates a collection of NFTs by creating JSON files and PNG files for your Solana collection. It takes user input for various parameters such as collection size, collection name, collection symbol, collection description, image location, external URL, trait types, trait values, and creator information. The JSON files contain metadata for each NFT, including the image, name, symbol, description, and attributes.<br><br>

## Requirements<br><br>

- Node.js
- NPM
- Jimp<br><br>

## Installation and Setup<br><br>

- Download and install the latest version of Node.js from the official website.

- Clone the repository to your local machine by running the following command in your terminal:

        git clone https://github.com/username/repo.git

- Navigate to the root directory of the cloned repository in your terminal.

- Install the required packages by running the following command in your terminal:

        npm install

## Usage<br><br>

- Place the image file you want to use as the base image for the NFTs in the root directory of the cloned repository.

- Open a terminal and navigate to the root directory of the cloned repository.

- Run the script by running the following command in your terminal:

        node metaDataGenerator.js

- Follow the prompts to input the required information.

- The script will create a folder named "images" and a folder named "json_files" to store the generated images and JSON files, respectively.

- If any files fail to generate, the script will retry those files at the end.<br><br>

## Input Parameters<br><br>

The script will prompt for the following information:<br><br>

- Collection size: The number of NFTs to generate.

- Collection name: The name of the collection.

- Collection symbol: The symbol for the collection (e.g. SOL, ETH).

- Collection description: A brief description of the collection.

- Royalties percentage: The percentage of royalties to be paid to creators.

- Image file: The location of the image file to use as the base image for the NFTs.

- External URL (optional): An optional external URL for the collection.

- Number of traits: The number of traits to be associated with each NFT.

- Trait type: The type of each trait (e.g. head, background).

- Trait value: The value of each trait (e.g. red, blue).

- Number of creators: The number of creators for royalties wallets associated with the collection.

- Creator address: The wallet address of each creator.

- Creator share: The percentage of royalties to be paid to each creator.<br><br>

## Output<br><br>

The script will generate PNG images and JSON files for each NFT in the collection, and store them in the "images" and "json_files" folders, respectively. The JSON files contain metadata for each NFT, including the name, symbol, description, image, external URL (if provided), attributes, and creator information.
