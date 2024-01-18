import moment from 'moment';
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { $createElementNode, $createHeadingNode } from "@lexical/text";

/**
 * docs: https://lexical.dev/docs/demos/plugins/markdown
 */

export function textDailyStandup() {
    const root = $getRoot();

    /**
     * Today's Standup date
     */
    const paragraphParent = $createParagraphNode();
    // const currentDate = new Date();
    const todayStandupDate = moment(new Date()).format('MM/DD/YYYY');
    paragraphParent.append(
        $createTextNode(`${todayStandupDate}`),
    );

    const paragraphTwo = $createParagraphNode();
    paragraphTwo.append($createTextNode("#focusing"));
    const listForParagraphTwo = $createListNode("bullet");
    listForParagraphTwo.append(
        $createListItemNode().append(
            $createTextNode(`..`)
        )
    );

    const paragraphThree = $createParagraphNode();
    paragraphThree.append($createTextNode("#queue"));
    const listForParagraphThree = $createListNode("bullet");
    listForParagraphThree.append(
        $createHeadingNode().append(
            $createTextNode(`..`)
        )
    );

    const paragraphFour = $createParagraphNode();
    paragraphFour.append($createTextNode("#achieved"));
    const listForParagraphFour = $createListNode("bullet");
    listForParagraphFour.append(
        $createListItemNode().append(
            $createTextNode(`..`)
        )
    );

    /**
     * Root
     */
    root.append(paragraphParent);
    root.append(paragraphTwo);
    root.append(listForParagraphTwo);
    root.append(paragraphThree);
    root.append(paragraphFour);
}