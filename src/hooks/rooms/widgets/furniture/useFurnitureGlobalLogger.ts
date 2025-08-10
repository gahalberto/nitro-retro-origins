import { RoomEngineTriggerWidgetEvent } from '@nitrots/nitro-renderer';
import { useRoomEngineEvent } from '../../../events';

const useFurnitureGlobalLoggerState = () =>
{
    console.log('🔍 [FURNITURE DEBUG] Global Logger - Monitorando TODOS os eventos de furniture widgets');

    // Intercepta TODOS os possíveis eventos de widgets de móveis
    useRoomEngineEvent<RoomEngineTriggerWidgetEvent>([
        RoomEngineTriggerWidgetEvent.REQUEST_CREDITFURNI,
        RoomEngineTriggerWidgetEvent.REQUEST_STICKIE,
        RoomEngineTriggerWidgetEvent.REQUEST_PRESENT,
        RoomEngineTriggerWidgetEvent.REQUEST_TROPHY,
        RoomEngineTriggerWidgetEvent.REQUEST_TEASER,
        RoomEngineTriggerWidgetEvent.REQUEST_ECOTRONBOX,
        RoomEngineTriggerWidgetEvent.REQUEST_DIMMER,
        RoomEngineTriggerWidgetEvent.REQUEST_FRIEND_FURNITURE_ENGRAVING,
        RoomEngineTriggerWidgetEvent.REQUEST_BADGE_DISPLAY_ENGRAVING,
        RoomEngineTriggerWidgetEvent.REQUEST_HIGH_SCORE_DISPLAY,
        RoomEngineTriggerWidgetEvent.REQUEST_HIDE_HIGH_SCORE_DISPLAY,
        RoomEngineTriggerWidgetEvent.REQUEST_INTERNAL_LINK,
        RoomEngineTriggerWidgetEvent.REQUEST_ROOM_LINK,
        RoomEngineTriggerWidgetEvent.REQUEST_PLAYLIST_EDITOR,
        RoomEngineTriggerWidgetEvent.REQUEST_MANNEQUIN,
        RoomEngineTriggerWidgetEvent.REQUEST_BACKGROUND_COLOR,
        RoomEngineTriggerWidgetEvent.REQUEST_STACK_HEIGHT,
        RoomEngineTriggerWidgetEvent.REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING,
        RoomEngineTriggerWidgetEvent.REQUEST_ACHIEVEMENT_RESOLUTION_FAILED,
        RoomEngineTriggerWidgetEvent.OPEN_WIDGET,
        RoomEngineTriggerWidgetEvent.CLOSE_WIDGET,
        RoomEngineTriggerWidgetEvent.OPEN_FURNI_CONTEXT_MENU,
        RoomEngineTriggerWidgetEvent.CLOSE_FURNI_CONTEXT_MENU,
        RoomEngineTriggerWidgetEvent.REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG,
        RoomEngineTriggerWidgetEvent.REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG,
        RoomEngineTriggerWidgetEvent.REQUEST_EFFECTBOX_OPEN_DIALOG,
        RoomEngineTriggerWidgetEvent.REQUEST_MYSTERYBOX_OPEN_DIALOG,
        RoomEngineTriggerWidgetEvent.REQUEST_MYSTERYTROPHY_OPEN_DIALOG,
        RoomEngineTriggerWidgetEvent.REQUEST_EXTERNAL_IMAGE
    ], event =>
    {
        console.log('🚨 [FURNITURE DEBUG] >>> EVENTO DETECTADO <<<');
        console.log('🔗 Tipo do evento:', event.type);
        console.log('🏠 Room ID:', event.roomId);
        console.log('📦 Object ID:', event.objectId);
        console.log('📂 Category:', event.category);
        console.log('📋 Dados completos do evento:', event);
        console.log('🚨 [FURNITURE DEBUG] >>> FIM DO EVENTO <<<');
    });

    return {};
}

export const useFurnitureGlobalLogger = useFurnitureGlobalLoggerState;
