const playerDefaultSettings = {
    x: 320,
    y: 100,
    width: 20,
    height: 20,
    maxJumpHeight: 200,
    currentSpeedXToTheRight: 4,
    currentSpeedXToTheLeft: -4,
    downwardForce: -5,
};

const worldDefaultSettings = {
    gravity: 10,
    worldGridCellSizeForNormalSpeeds: 10,
    worldGridCellSizeForHighSpeeds: 10,
};

const collisionMapImageBase64 = ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAH0AAAAHgCAYAAAAoDFuJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4yMfEgaZUAAE8QSURBVHhe7N3hcto4GIbRivvb+78cb9iKlyxpHQWDZMvnzGTwz0wbf5IN5inLh18AAAAAwNRKKfXo79wqBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDn/fPr+1bQUVzqKwAAAADAUNdIe8sPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBeAugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACKADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEALoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAigAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIQAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAC6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAIoAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACKADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEALoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAigAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIQAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAC6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAIoAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAugAA5RS/voDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjCaADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEALoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAigAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIQAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAC6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAIoAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACKADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEALoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAigAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIQAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAC6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAIoAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACKADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEALoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAigAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIQAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAC6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAIoAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACKADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEALoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAigAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIQAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAC6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAIoAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACKADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEALoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAigAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIQAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAC6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAIoAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACKADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEALoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAigAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIQAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAC6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAIoAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACKADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEALoAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAEAhAB0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoBKADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhQB0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoBCADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQC0AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBCADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQCEAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgHoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCEAHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgEoAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACFAHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgEIAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFALQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgEIAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAIQAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA7Nu3/wMJQBalyDf/QwAAAABJRU5ErkJggg==';
