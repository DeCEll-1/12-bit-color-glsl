#include "../ReShade.fxh"

uniform float3 colors[11] = {
        // float3(1, 0.8509804, 0.8431373),
        // float3(1, 0.7490196, 0.7450981),
        // float3(1, 0.6392157, 0.6392157),
        // float3(1, 0.5215687, 0.5333334),
        // float3(0.945098, 0.4392157, 0.454902),
        // float3(0.8509804, 0.2666667, 0.3176471),
        // float3(0.6745098, 0, 0.1686275),
        // float3(0.4156863, 0, 0.09019608),
        // float3(0.2117647, 0, 0.02745098),

        // float3(0.8862745, 1, 0.8666667),
        // float3(0.627451, 1, 0.5764706),
        // float3(0.4823529, 0.9490196, 0.4156863),
        // float3(0.4078431, 0.8784314, 0.3411765),
        // float3(0.3372549, 0.8078431, 0.2666667),
        // float3(0.2470588, 0.7372549, 0.1686275),
        // float3(0.1215686, 0.6078432, 0),
        // float3(0.07450981, 0.4313726, 0),
        // float3(0.03137255, 0.2627451, 0),
        // float3(0.007843138, 0.1215686, 0),

        float3(0.8431373, 1, 0.9764706),
        float3(0.5843138, 0.9764706, 0.9254902),
        float3(0.5137255, 0.9058824, 0.854902),
        float3(0.4431373, 0.8352941, 0.7843137),
        float3(0.3686275, 0.7647059, 0.7176471),
        float3(0.2745098, 0.7019608, 0.6509804),
        float3(0, 0.5843138, 0.5372549),
        float3(0, 0.4156863, 0.3803922),
        float3(0, 0.2509804, 0.227451),
        float3(0, 0.1176471, 0.1019608),
        float3(1, 0.945098, 0.945098)

    };

float myDistance(float3 one, float3 two) {
    return pow(one.r - two.r, 2.) +
            pow(one.g - two.g, 2.) +
            pow(one.g - two.b, 2.);
}

float3 main(float4 position : SV_Position, float2 texcoord : TexCoord) : SV_Target
{
    float2 uv = texcoord.xy;
    float3 texCol = tex2D(ReShade::BackBuffer, uv).rgb;

    float4 closestCol = float4(0., 0., 0., 1.);

    for (int i = 0; i < 10; i++) {
        float3 colToCheck = colors[i];
        float dist = myDistance(colToCheck.rgb, texCol.rgb);

        if (closestCol.w > dist) {
            closestCol = float4(colToCheck.rgb, dist);
        }
    }

    return float3(closestCol.rgb);
}

technique ColorPalette
{
	pass
	{
		VertexShader = PostProcessVS;
		PixelShader = main;
	}
}
