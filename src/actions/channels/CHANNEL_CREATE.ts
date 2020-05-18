import { Action } from '../../lib/structures/Action';
import { Channel } from '../../client/caching/structures/channels/Channel';
import { isGuildChannel, GuildBasedChannel } from '../../util/Util';

import type { ChannelCreateDispatch } from '@klasa/ws';
import type { DMChannel } from '../../client/caching/structures/channels/DMChannel';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: ChannelCreateDispatch): GuildBasedChannel | DMChannel | null {
		return Channel.create(this.client, data.d, data.d.guild_id && this.client.guilds.get(data.d.guild_id)) as GuildBasedChannel | DMChannel | null;
	}

	public cache(data: GuildBasedChannel | DMChannel): void {
		if (isGuildChannel(data)) data.guild.channels.set(data.id, data);
		else this.client.dms.set(data.id, data);
	}

}
