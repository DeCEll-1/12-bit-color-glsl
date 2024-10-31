
#ifdef GL_ES
precision mediump float;
#endif

#iChannel0 "file://Hard.jpg"

const vec3[] colors = vec3[](
        // vec3(1, 0.8509804, 0.8431373),
        // vec3(1, 0.7490196, 0.7450981),
        // vec3(1, 0.6392157, 0.6392157),
        // vec3(1, 0.5215687, 0.5333334),
        // vec3(0.945098, 0.4392157, 0.454902),
        // vec3(0.8509804, 0.2666667, 0.3176471),
        // vec3(0.6745098, 0, 0.1686275),
        // vec3(0.4156863, 0, 0.09019608),
        // vec3(0.2117647, 0, 0.02745098),

        // vec3(0.8862745, 1, 0.8666667),
        // vec3(0.627451, 1, 0.5764706),
        // vec3(0.4823529, 0.9490196, 0.4156863),
        // vec3(0.4078431, 0.8784314, 0.3411765),
        // vec3(0.3372549, 0.8078431, 0.2666667),
        // vec3(0.2470588, 0.7372549, 0.1686275),
        // vec3(0.1215686, 0.6078432, 0),
        // vec3(0.07450981, 0.4313726, 0),
        // vec3(0.03137255, 0.2627451, 0),
        // vec3(0.007843138, 0.1215686, 0),

        vec3(0.8431373, 1, 0.9764706),
        vec3(0.5843138, 0.9764706, 0.9254902),
        vec3(0.5137255, 0.9058824, 0.854902),
        vec3(0.4431373, 0.8352941, 0.7843137),
        vec3(0.3686275, 0.7647059, 0.7176471),
        vec3(0.2745098, 0.7019608, 0.6509804),
        vec3(0, 0.5843138, 0.5372549),
        vec3(0, 0.4156863, 0.3803922),
        vec3(0, 0.2509804, 0.227451),
        vec3(0, 0.1176471, 0.1019608),
        vec3(1, 0.945098, 0.945098)

    );

float myDistance(vec3 one, vec3 two) {
    return pow(one.r - two.r, 2.) +
        pow(one.g - two.g, 2.) +
        pow(one.g - two.b, 2.);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec4 col = vec4(1.);
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv.x *= iResolution.x / iResolution.y;

    vec4 texCol = texture(iChannel0, uv);

    vec4 closestCol = vec4(0., 0., 0., 1.);

    for (int i = 0; i < colors.length(); i++) {
        vec3 colToCheck = colors[i];
        float dist = myDistance(colToCheck.rgb, texCol.rgb);

        if (closestCol.w > dist) {
            closestCol = vec4(colToCheck.rgb, dist);
        }
    }

    fragColor = vec4(closestCol.rgb, 1.);
}
