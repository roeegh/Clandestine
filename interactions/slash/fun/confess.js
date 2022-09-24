const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('confess')
		.setDescription('Do an anonymous confession!')
        .addStringOption(option => option.setName('confession').setDescription('Your confession!').setRequired(true))
        .addAttachmentOption(option => option.setName('attachment').setDescription('An attachment to your confession!')),
	async execute(interaction) {
        interaction.guild.channels.fetch('812951105586724964').then(channel => {
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Anonymous Confession')
                        .setDescription(interaction.options.getString('confession'))
                        .setImage(interaction.options.getAttachment('attachment')?.url)
                        .setTimestamp()
                ]
            })
        })

		await interaction.reply({
			content: 'Your confession has been sent!',
			ephemeral: true,
		});
	}
};